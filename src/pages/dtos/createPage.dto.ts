/* eslint-disable prettier/prettier */
import { IsNotEmpty, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger/dist/decorators";
export class CreatePageDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(3)
  url: string;
  @ApiProperty()
  @IsNotEmpty()
  page: object;
}
