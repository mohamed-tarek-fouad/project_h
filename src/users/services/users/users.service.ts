import { PrismaService } from "./../../../prisma.service";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { UpdateUserDto } from "./../../dtos/updateUser.dto";
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async allUsers() {
    const user = await this.prisma.users.findMany({});
    return user;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.users.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new HttpException("User not found", HttpStatus.BAD_REQUEST);
    }

    const updatedUser = await this.prisma.users.update({
      where: { id },
      data: updateUserDto,
    });
    return updatedUser;
  }
}
