/* eslint-disable prettier/prettier */

import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateBookingDto } from "./dtos/createBooking.dto";
import { HttpException } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common";
import { Inject } from "@nestjs/common";
import { CACHE_MANAGER } from "@nestjs/common";
import { Cache } from "cache-manager";

@Injectable()
export class BookingService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async createBooking(createBookingDto: CreateBookingDto, id: string, req) {
    try {
      const router = await this.prisma.router.findUnique({
        where: {
          domain: id,
        },
      });

      if (!router) {
        throw new HttpException(
          "this router doesn't exist",
          HttpStatus.BAD_REQUEST,
        );
      }
      const booking = await this.prisma.booking.create({
        data: {
          ...createBookingDto,
          bookingID: id,
          userId: req.user.userId,
        },
      });
      await this.cacheManager.del("bookings");
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
          id,
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
          domain: router,
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
          id,
        },
        data: {
          ...updateBookingDto,
          userId: req.user.userId,
        },
      });
      await this.cacheManager.del("bookings");
      return { ...booking, message: "booking updated successfully" };
    } catch (err) {
      return err;
    }
  }
  async allBookings(routerId: string) {
    try {
      const isCached = await this.cacheManager.get("bookings");
      if (isCached) {
        return { isCached, message: "fetched all users successfully" };
      }
      const bookings = await this.prisma.booking.findMany({
        where: {
          bookingID: routerId,
        },
      });
      if (bookings.length === 0) {
        throw new HttpException(
          "booking doesn't exist",
          HttpStatus.BAD_REQUEST,
        );
      }
      await this.cacheManager.set("bookings", bookings);
      return { ...bookings, message: "bookings fetched successfully" };
    } catch (err) {
      return err;
    }
  }
  async bookingById(id: string) {
    try {
      const booking = await this.prisma.booking.findUnique({
        where: {
          id,
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
          id,
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
          id,
        },
      });
      await this.cacheManager.del("bookings");
      return { message: "booking canceled" };
    } catch (err) {
      return err;
    }
  }
}
