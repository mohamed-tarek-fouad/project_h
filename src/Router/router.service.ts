/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { CreateRouterDto } from "./dtos/createRouter.dto";
import { PrismaService } from "./../prisma.service";
import { UpdateRouterDto } from "./dtos/updateRouter.dto";
import { HttpStatus } from "@nestjs/common";
import { HttpException } from "@nestjs/common";
import { Inject } from "@nestjs/common";
import { CACHE_MANAGER } from "@nestjs/common";
import { Cache } from "cache-manager";

@Injectable()
export class RouterService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
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
      await this.cacheManager.del("routers");
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
      await this.cacheManager.del("routers");
      await this.cacheManager.del(domain);
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
        const isCached = await this.cacheManager.get(
          `routers${take}${skip}${type}${searsh}`,
        );
        if (isCached) {
          return { isCached, message: "fetched all routers successfully" };
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
        await this.cacheManager.set(
          `routers${take}${skip}${type}${searsh}`,
          routers,
        );
        return { ...routers, message: "fetched all routers" };
      } else {
        const isCached = await this.cacheManager.get(`routers${type}${searsh}`);
        if (isCached) {
          return { isCached, message: "fetched all routers successfully" };
        }
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
        await this.cacheManager.set(`routers${type}${searsh}`, routers);
        return { ...routers, message: "fetched all routers" };
      }
    } catch (err) {
      return err;
    }
  }
  async routerById(domain: string) {
    try {
      const isCached = await this.cacheManager.get(domain);
      if (isCached) {
        return { isCached, message: "fetched router successfully" };
      }
      const router = await this.prisma.router.findUnique({
        where: { domain },
        include: {
          pages: { select: { url: true } },
        },
      });
      if (!router) {
        throw new HttpException("router doesn't exist", HttpStatus.BAD_REQUEST);
      }
      await this.cacheManager.set(domain, router);
      return { ...router, message: "router fetched successfully" };
    } catch (err) {
      return err;
    }
  }
}
