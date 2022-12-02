/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { CreateRouterDto } from "./dtos/createRouter.dto";
import { PrismaService } from "./../prisma.service";
import { HttpException } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common";
import { UpdateRouterDto } from "./dtos/updateRouter.dto";

@Injectable()
export class RouterService {
  constructor(private prisma: PrismaService) {}
  async createRouter(createRouterDto: CreateRouterDto, req) {
    try {
      const routerExists = await this.prisma.router.findUnique({
        where: {
          domain: createRouterDto.domain,
        },
      });
      if (routerExists) {
        throw new HttpException(
          "this route already exist",
          HttpStatus.BAD_REQUEST,
        );
      }
      const router = await this.prisma.router.create({
        data: createRouterDto,
      });
      await this.prisma.routerAdmin.create({
        data: {
          routerId: createRouterDto.domain,
          userId: req.user.userId,
        },
      });
      return router;
    } catch (err) {
      err;
    }
  }
  async updateRouter(updateRouterDto: UpdateRouterDto, domain) {
    try {
      const routerExist = await this.prisma.router.findUnique({
        where: {
          domain,
        },
      });
      if (!routerExist) {
        throw new HttpException(
          "this route does'nt exist",
          HttpStatus.BAD_REQUEST,
        );
      }
      const updatedRoute = await this.prisma.router.update({
        where: {
          domain,
        },
        data: updateRouterDto,
      });
      return updatedRoute;
    } catch (err) {
      return err;
    }
  }
  async allRouters() {
    try {
      const routers = await this.prisma.router.findMany({});
      return routers;
    } catch (err) {
      return err;
    }
  }
  async routerById(domain) {
    try {
      const router = await this.prisma.router.findUnique({
        where: {
          domain,
        },
      });
      if (!router) {
        throw new HttpException(
          "this route does'nt exist",
          HttpStatus.BAD_REQUEST,
        );
      }
      return router;
    } catch (err) {
      return err;
    }
  }
}
