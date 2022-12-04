/* eslint-disable prettier/prettier */
import { SpecialitiesController } from "./specialities.controller";
import { SpecialitiesService } from "./specialities.service";
import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Module({
  imports: [],
  controllers: [SpecialitiesController],
  providers: [SpecialitiesService, PrismaService],
})
export class SpecialitiesModule {}
