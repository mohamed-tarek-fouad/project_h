/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { PrismaService } from "./../prisma.service";
import { CreateSpecialityDto } from "./dtos/createSpeciality.dto";
import { HttpException } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common";
import { Inject } from "@nestjs/common";
import { CACHE_MANAGER } from "@nestjs/common";
import { Cache } from "cache-manager";

@Injectable()
export class SpecialitiesService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  // async createSpeciality(createSpecialityDto: CreateSpecialityDto) {
  //   try {
  //     const specialityExist = await this.prisma.specialities.findUnique({
  //       where: {
  //         id: createSpecialityDto.id,
  //       },
  //     });
  //     if (specialityExist) {
  //       throw new HttpException(
  //         "speciality already exist",
  //         HttpStatus.BAD_REQUEST,
  //       );
  //     }
  //     const speciality = await this.prisma.specialities.create({
  //       data: createSpecialityDto,
  //     });
  //     return { ...speciality, message: "speciality created successfully" };
  //   } catch (err) {
  //     return err;
  //   }
  // }
  async createDoctor(createSpecialityDto: CreateSpecialityDto, req) {
    try {
      const doctorId = req.user.userId;
      createSpecialityDto.id.map(async (i) => {
        await this.prisma.doctorSpeciality.createMany({
          data: [
            {
              specialityId: i,
              doctorId,
            },
          ],
        });
      });
      await this.cacheManager.del(`doctors${createSpecialityDto.id}`);
      return { message: "doctor created successfully" };
    } catch (err) {
      return err;
    }
  }
  async createRouterSpeciality(createSpecialityDto: CreateSpecialityDto, req) {
    try {
      const routerAdmin = await this.prisma.routerAdmin.findFirst({
        where: {
          userId: req.user.userId,
        },
      });
      if (!routerAdmin) {
        throw new HttpException("not autherized", HttpStatus.UNAUTHORIZED);
      }
      createSpecialityDto.id.map(async (i) => {
        await this.prisma.routerSpecialities.createMany({
          data: [
            {
              specialityId: i,
              routerId: routerAdmin.routerId,
            },
          ],
        });
      });
      await this.cacheManager.del(`routers${createSpecialityDto.id}`);
      return {
        message: "router speciality created successfully",
      };
    } catch (err) {
      return err;
    }
  }
  async allDoctors(speciality: string) {
    try {
      if (speciality) {
        const isCached = await this.cacheManager.get(`doctors${speciality}`);
        if (isCached) {
          return { isCached, message: "fetched all doctors successfully" };
        }
        const doctors = await this.prisma.doctorSpeciality.findMany({
          where: {
            specialityId: speciality,
          },
        });
        await this.cacheManager.set("doctors", doctors);
        return { ...doctors, message: "fetched all doctors successfully" };
      } else {
        const isCached = await this.cacheManager.get(`doctors${speciality}`);
        if (isCached) {
          return { isCached, message: "fetched all doctors successfully" };
        }
        const doctors = await this.prisma.doctorSpeciality.findMany({});
        await this.cacheManager.set("doctors", doctors);
        return { ...doctors, message: "fetched all doctors successfully" };
      }
    } catch (err) {
      return err;
    }
  }
  async allRoutersSpeciality(speciality: string) {
    try {
      if (speciality) {
        const isCached = await this.cacheManager.get(`router${speciality}`);
        if (isCached) {
          return { isCached, message: "fetched all routers successfully" };
        }
        const routers = await this.prisma.routerSpecialities.findMany({
          where: {
            specialityId: speciality,
          },
        });
        await this.cacheManager.set("routers", routers);
        return { ...routers, message: "fetched all routers successfully" };
      } else {
        const isCached = await this.cacheManager.get(`router${speciality}`);
        if (isCached) {
          return { isCached, message: "fetched all routers successfully" };
        }
        const routers = await this.prisma.routerSpecialities.findMany({});
        await this.cacheManager.set("routers", routers);
        return { ...routers, message: "fetched all routers successfully" };
      }
    } catch (err) {
      return err;
    }
  }
}
