/* eslint-disable prettier/prettier */
import { IsEmail, IsOptional, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger/dist/decorators";
export class UpdateUserDto {
  @ApiProperty()
  @MinLength(3)
  firstname: string;
  @ApiProperty()
  @MinLength(3)
  lastname: string;
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  address: string;
  @ApiProperty()
  phoneNumber: string;
  @ApiProperty()
  @IsOptional()
  info: string;
  @ApiProperty()
  @IsOptional()
  profilePic: string;
  @ApiProperty()
  @IsOptional()
  role: any;
}
