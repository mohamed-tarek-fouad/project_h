/* eslint-disable prettier/prettier */
import {
  Controller,
  UseGuards,
  Post,
  Req,
  Body,
  UseInterceptors,
  UploadedFile,
  Param,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport/dist";
import { JwtAuthGuard } from "src/jwtAuthGuard";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dtos/createUser.dto";
import { ApiBearerAuth, ApiBody } from "@nestjs/swagger/dist";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { ForgetPasswordDto } from "./dtos/forgetPassword.dto";
import { ResetPasswordDto } from "./dtos/resetPassword.dto";
import { Patch } from "@nestjs/common";
import { UpdateUserDto } from "./dtos/updateUser.dto";
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
  @Post("forgetPassword")
  forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
    return this.authService.forgetPassword(forgetPasswordDto);
  }
  @Post("resetPassword/:id/:token")
  resetPassword(
    @Body() resetPasswordDto: ResetPasswordDto,
    @Param("id") id: string,
    @Param("token") token: string,
  ) {
    return this.authService.resetPassword(resetPasswordDto, id, token);
  }
  @UseInterceptors(
    FileInterceptor("profilePic", {
      preservePath: true,
      fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return cb(new Error("Only image files are allowed!"), false);
        }
        cb(null, true);
      },
      storage: diskStorage({
        destination: "./uploads",
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join("");
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  @Patch(":id")
  updateUser(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() profilePic,
  ) {
    return this.authService.updateUser(id, updateUserDto, profilePic);
  }
}
