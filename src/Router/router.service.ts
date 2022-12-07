/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { CreateRouterDto } from "./dtos/createRouter.dto";
import { PrismaService } from "./../prisma.service";
import { UpdateRouterDto } from "./dtos/updateRouter.dto";
import { HttpStatus } from "@nestjs/common";
import { HttpException } from "@nestjs/common";

@Injectable()
export class RouterService {
  constructor(private prisma: PrismaService) {}
  async createRouter(createRouterDto: CreateRouterDto, req) {
    try {
      if (!createRouterDto.schedule) {
        createRouterDto.schedule = { smth: "smth" };
      }
      const routerExist = await this.prisma.router.findFirst({
        where: {
          AND: [
            { domainName: createRouterDto.domainName },
            { type: createRouterDto.type },
          ],
        },
      });
      if (routerExist) {
        return {
          message: "route already exist",
          status: HttpStatus.BAD_REQUEST,
        };
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
        throw new HttpException("router doesn't exist", HttpStatus.BAD_REQUEST);
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
        if (routers.length === 0) {
          throw new HttpException(
            "router doesn't exist",
            HttpStatus.BAD_REQUEST,
          );
        }

        return { ...routers, message: "fetched all routers" };
      } else {
        const routers = await this.prisma.router.findMany({
          where: {
            type,
            domainName: { contains: searsh },
          },
        });
        if (routers.length === 0) {
          throw new HttpException(
            "router doesn't exist",
            HttpStatus.BAD_REQUEST,
          );
        }
        return { ...routers, message: "fetched all routers" };
      }
    } catch (err) {
      return err;
    }
  }
  async routerById(domain: string) {
    try {
      const router = await this.prisma.router.findUnique({
        where: { domain },
      });
      if (!router) {
        throw new HttpException("router doesn't exist", HttpStatus.BAD_REQUEST);
      }

      return { ...router, message: "router fetched successfully" };
    } catch (err) {
      return err;
    }
  }
}
