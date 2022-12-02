import { Controller, Get, Body, Patch, Param, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UpdateUserDto } from "./dtos/updateUser.dto";
import { JwtAuthGuard } from "../jwtAuthGuard";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}
  @UseGuards(JwtAuthGuard)
  @Get("")
  allUsers() {
    return this.usersService.allUsers();
  }
  @Get(":id")
  userById(@Param("id") id: string) {
    return this.usersService.userById(id);
  }

  @Patch(":id")
  updateUser(@Param("id") id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(+id, updateUserDto);
  }
}
