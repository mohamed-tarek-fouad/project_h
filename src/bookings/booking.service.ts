/* eslint-disable prettier/prettier */

import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateBookingDto } from "./dtos/createBooking.dto";
import { HttpException } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common";

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}
  async createBooking(createBookingDto: CreateBookingDto, id: string, req) {
    try {
      const booking = await this.prisma.booking.create({
        data: { ...createBookingDto, bookingID: id, userId: req.user.userId },
      });
      return booking;
    } catch (err) {
      return err;
    }
  }
  async updateBooking(
    updateBookingDto: CreateBookingDto,
    id: string,
    router,
    req,
  ) {
    try {
      const bookingExist = await this.prisma.booking.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      if (!bookingExist) {
        throw new HttpException(
          "this booking doesn't exist",
          HttpStatus.BAD_REQUEST,
        );
      }
      const booking = await this.prisma.booking.update({
        where: {
          id: parseInt(id),
        },
        data: {
          ...updateBookingDto,
          userId: req.user.userId,
          bookingID: router,
        },
      });
      return booking;
    } catch (err) {
      return err;
    }
  }
  async allBookings(routerId) {
    try {
      const bookings = await this.prisma.booking.findMany({
        where: {
          bookingID: routerId,
        },
      });
      return bookings;
    } catch (err) {
      return err;
    }
  }
  async bookingById(id) {
    try {
      const booking = await this.prisma.booking.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      return booking;
    } catch (err) {
      return err;
    }
  }
  async deleteBooking(id: string) {
    try {
      await this.prisma.booking.delete({
        where: {
          id: parseInt(id),
        },
      });
      return "booking hase been canceled";
    } catch (err) {
      return err;
    }
  }
}
