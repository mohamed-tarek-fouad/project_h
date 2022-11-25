/* eslint-disable prettier/prettier */
import { Controller, UseGuards, Post, Req, Body } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport/dist";
import { JwtAuthGuard } from "src/jwtAuthGuard";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dtos/createUser.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(AuthGuard("local"))
  @Post("login")
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @Post("register")
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
  @UseGuards(JwtAuthGuard)
  @Post("logout")
  logout(@Req() req) {
    return this.authService.logout(req);
  }
}
