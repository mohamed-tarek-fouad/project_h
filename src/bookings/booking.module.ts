/* eslint-disable prettier/prettier */
import { BookingController } from "./booking.controller";
import { BookingService } from "./booking.service";
import { Module } from "@nestjs/common";
import { PrismaService } from "./../prisma.service";

@Module({
  imports: [],
  controllers: [BookingController],
  providers: [BookingService, PrismaService],
})
export class BookingModule {}
