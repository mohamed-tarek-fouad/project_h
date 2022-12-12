import { PrismaService } from "../prisma.service";
import {
  Injectable,
  HttpException,
  HttpStatus,
  Inject,
  CACHE_MANAGER,
} from "@nestjs/common";
import { UpdateUserDto } from "./dtos/updateUser.dto";
import { Cache } from "cache-manager";
@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async allUsers() {
    try {
      // const isCached = await this.cacheManager.get("users");
      // if (isCached) {
      //   return { isCached, message: "fetched all users successfully" };
      // }
      const user = await this.prisma.users.findMany({});
      if (user.length === 0) {
        throw new HttpException("user does'nt exist", HttpStatus.BAD_REQUEST);
      }
      // await this.cacheManager.set("users", user);
      return { ...user, message: "fetched all users successfully" };
    } catch (err) {
      return err;
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
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
          id,
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
      const routerAdmin = user.routerAdmin.map((d) => {
        return {
          domain: d.router.domain,
          domainName: d.router.domainName,
          rating: d.router.rating,
          voters: d.router.voters,
          type: d.router.type,
        };
      });
      delete user.routerAdmin;
      return { ...user, routerAdmin, message: "user fetched successfully" };
    } catch (err) {
      return err;
    }
  }
}
