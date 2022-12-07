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
  async allRouters(take: string, skip: string, type: any, searsh: string) {
    try {
      if (take) {
        if (!skip) {
          skip = "0";
        }
        const routers = await this.prisma.router.findMany({
          take: parseInt(take),
          skip: parseInt(skip),
          where: {
            type,
            domainName: { contains: searsh },
          },
        });
        if (!routers) {
          throw new HttpException("no routers exist", HttpStatus.BAD_REQUEST);
        }
        return { ...routers, message: "fetched all routers" };
      } else {
        const routers = await this.prisma.router.findMany({
          where: {
            type,
            domainName: { contains: searsh },
          },
        });
        if (!routers) {
          throw new HttpException("no routers exist", HttpStatus.BAD_REQUEST);
        }
        return { ...routers, message: "fetched all routers" };
      }
    } catch (err) {
      return err;
    }
  }
  async routerById(domain: string) {
    try {
      const route = await this.prisma.router.findUnique({
        where: { domain },
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
