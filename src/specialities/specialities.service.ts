/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { PrismaService } from "./../prisma.service";
import { CreateSpecialityDto } from "./dtos/createSpeciality.dto";
import { HttpException } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common";

@Injectable()
export class SpecialitiesService {
  constructor(private prisma: PrismaService) {}
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
        console.log(i);
      });
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
        const doctors = await this.prisma.doctorSpeciality.findMany({
          where: {
            specialityId: speciality,
          },
        });
        return { ...doctors, message: "fetched all doctors successfully" };
      } else {
        const doctors = await this.prisma.doctorSpeciality.findMany({});
        return { ...doctors, message: "fetched all doctors successfully" };
      }
    } catch (err) {
      return err;
    }
  }
}
