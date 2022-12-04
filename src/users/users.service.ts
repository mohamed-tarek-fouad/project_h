import { PrismaService } from "../prisma.service";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { UpdateUserDto } from "./dtos/updateUser.dto";
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async allUsers() {
    try {
      const user = await this.prisma.users.findMany({});
      if (user.length === 0) {
        throw new HttpException("user does'nt exist", HttpStatus.BAD_REQUEST);
      }
      return { message: "fetched all users successfully" };
    } catch (err) {
      return err;
    }
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          id,
        },
      });
      if (!user) {
        throw new HttpException("user doesn't exist", HttpStatus.BAD_REQUEST);
      }

      const updatedUser = await this.prisma.users.update({
        where: { id },
        data: updateUserDto,
      });
      delete updatedUser.password;
      return { ...updatedUser, message: "user updated successfully" };
    } catch (err) {
      return err;
    }
  }
  async userById(id: string) {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          id: parseInt(id),
        },
        include: {
          routerAdmin: { select: { router: true } },
        },
      });
      if (!user) {
        throw new HttpException(
          "this user does'nt exist",
          HttpStatus.BAD_REQUEST,
        );
      }
      delete user.password;
      return { ...user, message: "user fetched successfully" };
    } catch (err) {
      return err;
    }
  }
}
