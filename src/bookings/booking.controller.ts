/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Req,
  Patch,
  UseGuards,
  Delete,
} from "@nestjs/common";
import { BookingService } from "./booking.service";
import { CreateBookingDto } from "./dtos/createBooking.dto";
import { JwtAuthGuard } from "./../jwtAuthGuard";

@Controller("booking")
export class BookingController {
  constructor(private bookingService: BookingService) {}
  @Post(":id")
  @UseGuards(JwtAuthGuard)
  createBooking(
    @Body() createBookingDto: CreateBookingDto,
    @Param("id") id: string,
    @Req() req,
  ) {
    return this.bookingService.createBooking(createBookingDto, id, req);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(":id/:router")
  updateBooking(
    @Body() updateBookingDto: CreateBookingDto,
    @Param("id") id: string,
    @Param("router") router: string,
    @Req() req,
  ) {
    return this.bookingService.updateBooking(updateBookingDto, id, router, req);
  }
  @Get("all/:router")
  allBookings(@Param("router") router: string) {
    return this.bookingService.allBookings(router);
  }
  @Get(":id")
  bookingById(@Param("id") id: string) {
    return this.bookingService.bookingById(id);
  }
  @Delete(":id")
  deleteBooking(@Param("id") id: string) {
    return this.bookingService.deleteBooking(id);
  }
}
