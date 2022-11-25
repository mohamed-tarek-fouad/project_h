/* eslint-disable prettier/prettier */
import { Cron, CronExpression } from "@nestjs/schedule";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "./../prisma.service";
import { CreateUserDto } from "./dtos/createUser.dto";
import * as bcrypt from "bcrypt";
import { HttpException } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common";
@Injectable()
export class AuthService {
  constructor(private jwtServise: JwtService, private prisma: PrismaService) {}
  async validateUser(email: string, password: string) {
    const user = await this.prisma.users.findUnique({
      where: {
        email,
      },
    });
    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
      return user;
    }
    return null;
  }
  async validateToken(id) {
    const token = await this.prisma.tokens.findUnique({
      where: {
        id,
      },
    });
    return token;
  }
  async login(user: any): Promise<any> {
    const token = await this.prisma.tokens.create({
      data: {
        userId: user.id,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      },
    });
    return {
      access_token: this.jwtServise.sign({
        user: { userId: user.id, role: user.role, tokenId: token.id },
      }),
    };
  }
  async register(userDto: CreateUserDto) {
    const userExist = await this.prisma.users.findUnique({
      where: {
        email: userDto.email,
      },
    });
    if (userExist) {
      throw new HttpException(
        "this user already exist",
        HttpStatus.BAD_REQUEST,
      );
    }
    const saltOrRounds = 10;
    userDto.password = await bcrypt.hash(userDto.password, saltOrRounds);
    const user = await this.prisma.users.create({
      data: userDto,
    });
    return user;
  }
  async logout(req) {
    const user = await this.prisma.tokens.delete({
      where: {
        id: req.user.tokenId,
      },
    });
    return user;
  }
  @Cron(CronExpression.EVERY_HOUR)
  async deleteExpiredTokens() {
    console.log("Checking for expired tokens...");
    const expiredTokens = await this.prisma.tokens.findMany({
      where: {
        expiresAt: {
          lte: new Date(),
        },
      },
    });
    if (expiredTokens.length > 0) {
      console.log(`Found ${expiredTokens.length} expired tokens`);
      for (const token of expiredTokens) {
        await this.prisma.tokens.delete({
          where: {
            id: token.id,
          },
        });
      }
      console.log("Deleted expired tokens");
    } else {
      console.log("No expired tokens found");
    }
  }
}
