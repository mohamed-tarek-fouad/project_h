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
      const router = await this.prisma.router.create({
        data: createRouterDto,
      });
      await this.prisma.routerAdmin.create({
        data: {
          routerId: router.domain,
          userId: req.user.userId,
        },
      });
      return { ...router, message: "router created successfully" };
    } catch (err) {
      err;
    }
  }
  async updateRouter(updateRouterDto: UpdateRouterDto, domain: number) {
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
      return { ...updatedRoute, message: "router updated successfully" };
    } catch (err) {
      return err;
    }
  }
  async allRouters() {
    try {
      const routers = await this.prisma.router.findMany({});
      if (routers.length === 0) {
        throw new HttpException(
          "routers does'nt exist",
          HttpStatus.BAD_REQUEST,
        );
      }
      return { ...routers, message: "fetched all routers" };
    } catch (err) {
      return err;
    }
  }
  async routerById(domain: number) {
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
      return { ...router, message: "router fetched successfully" };
    } catch (err) {
      return err;
    }
  }
}
