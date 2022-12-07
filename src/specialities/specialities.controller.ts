/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  UseGuards,
  Query,
} from "@nestjs/common";
import { CreateSpecialityDto } from "./dtos/createSpeciality.dto";
import { SpecialitiesService } from "./specialities.service";
import { JwtAuthGuard } from "src/jwtAuthGuard";

@Controller("specialities")
export class SpecialitiesController {
  constructor(private specialitiesService: SpecialitiesService) {}
  // @Post("")
  // createSpeciality(@Body() createSpecialityDto: CreateSpecialityDto) {
  //   return this.specialitiesService.createSpeciality(createSpecialityDto);
  // }
  @UseGuards(JwtAuthGuard)
  @Post("doctor")
  createDoctor(@Body() createSpecialityDto: CreateSpecialityDto, @Req() req) {
    return this.specialitiesService.createDoctor(createSpecialityDto, req);
  }
  @UseGuards(JwtAuthGuard)
  @Post("router")
  createRouterSpeciality(
    @Body() createSpecialityDto: CreateSpecialityDto,
    @Req() req,
  ) {
    return this.specialitiesService.createRouterSpeciality(
      createSpecialityDto,
      req,
    );
  }
  @Get("doctor")
  allDoctors(@Query("speciality") speciality?: string) {
    return this.specialitiesService.allDoctors(speciality);
  }
  @Get("router")
  allRoutersSpecility(@Query("speciality") speciality?: string) {
    return this.specialitiesService.allRoutersSpeciality(speciality);
  }
}
