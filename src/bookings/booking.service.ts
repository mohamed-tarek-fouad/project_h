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
    const router = await this.prisma.router.findUnique({
      where: {
        domain: parseInt(id),
      },
    });
    if (!router) {
      throw new HttpException(
        "this router doesn't exist",
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const booking = await this.prisma.booking.create({
        data: {
          ...createBookingDto,
          bookingID: parseInt(id),
          userId: req.user.userId,
        },
      });
      return { ...booking, message: "booking created successfully" };
    } catch (err) {
      return err;
    }
  }
  async updateBooking(
    updateBookingDto: CreateBookingDto,
    id: string,
    router: string,
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
      const routerExist = await this.prisma.router.findUnique({
        where: {
          domain: parseInt(router),
        },
      });
      if (!routerExist) {
        throw new HttpException(
          "this router doesn't exist",
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
        },
      });
      return { ...booking, message: "booking updated successfully" };
    } catch (err) {
      return err;
    }
  }
  async allBookings(routerId: string) {
    try {
      const bookings = await this.prisma.booking.findMany({
        where: {
          bookingID: parseInt(routerId),
        },
      });
      if (bookings.length === 0) {
        throw new HttpException(
          "booking doesn't exist",
          HttpStatus.BAD_REQUEST,
        );
      }
      return { ...bookings, message: "bookings fetched successfully" };
    } catch (err) {
      return err;
    }
  }
  async bookingById(id: string) {
    try {
      const booking = await this.prisma.booking.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      if (!booking) {
        throw new HttpException(
          "this booking doesn't exist",
          HttpStatus.BAD_REQUEST,
        );
      }
      return { ...booking, message: "booking fetched successfully" };
    } catch (err) {
      return err;
    }
  }
  async deleteBooking(id: string) {
    try {
      const booking = await this.prisma.booking.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      if (!booking) {
        throw new HttpException(
          "this booking doesn't exist",
          HttpStatus.BAD_REQUEST,
        );
      }
      await this.prisma.booking.delete({
        where: {
          id: parseInt(id),
        },
      });
      return { message: "booking canceled" };
    } catch (err) {
      return err;
    }
  }
}
