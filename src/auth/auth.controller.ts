/* eslint-disable prettier/prettier */
import { Controller, UseGuards, Post, Req, Body } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport/dist";
import { JwtAuthGuard } from "src/jwtAuthGuard";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dtos/createUser.dto";
import { ApiBearerAuth, ApiBody } from "@nestjs/swagger/dist";
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        email: {
          type: "string",
          example: "test1@gmail.com",
        },
        password: {
          type: "string",
          example: "123Mm123@",
        },
      },
    },
  })
  @UseGuards(AuthGuard("local"))
  @Post("login")
  async login(@Req() req) {
    return this.authService.login(req.user);
  }
  @Post("register")
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
  @ApiBearerAuth("access-token")
  @UseGuards(JwtAuthGuard)
  @Post("logout")
  logout(@Req() req) {
    return this.authService.logout(req);
  }
}
