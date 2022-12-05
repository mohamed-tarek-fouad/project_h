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
      if (!createRouterDto.schedule) {
        createRouterDto.schedule = { smth: "smth" };
      }
      const router = await this.prisma.router.create({
        data: createRouterDto,
      });
      console.log(router);
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
  async updateRouter(updateRouterDto: UpdateRouterDto, domain: string) {
    try {
      const routerExist = await this.prisma.router.findUnique({
        where: {
          domain: parseInt(domain),
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
          domain: parseInt(domain),
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
  async routerById(domain: string) {
    try {
      console.log(domain);
      const route = await this.prisma.router.findUnique({
        where: { domain: parseInt(domain) },
      });
      if (!route) {
        throw new HttpException(
          "this route does'nt exist",
          HttpStatus.BAD_REQUEST,
        );
      }

      return { ...route, message: "router fetched successfully" };
    } catch (err) {
      return err;
    }
  }
}
