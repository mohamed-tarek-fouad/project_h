/* eslint-disable prettier/prettier */
import { IsEmail, IsOptional, MinLength } from 'class-validator';

export class UpdateUserDto {
  @MinLength(3)
  firstname: string;
  @MinLength(3)
  lastname: string;
  @IsEmail()
  email: string;

  password: string;

  address: string;

  phoneNumber: string;

  @IsOptional()
  info: string;
  @IsOptional()
  profilePic: string;
  @IsOptional()
  role: any;
}
