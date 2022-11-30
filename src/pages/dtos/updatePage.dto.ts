/* eslint-disable prettier/prettier */

import { IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger/dist/decorators";
export class UpdatePageDto {
  @IsOptional()
  @ApiProperty({ example: "test" })
  url: string;
  @IsOptional()
  @ApiProperty({ example: { test: "test" } })
  page: object;
}
export class CreateCatDto {
  @ApiProperty()
  router: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  ex1: string;
  @ApiProperty()
  ex2: string;
  @ApiProperty()
  ex3: string;
  @ApiProperty()
  ex4: string;
  @ApiProperty()
  ex5: string;
  @ApiProperty()
  ex6: string;
}
