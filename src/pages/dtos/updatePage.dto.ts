/* eslint-disable prettier/prettier */

import { IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { IsNotEmpty } from "class-validator";
export class UpdatePageDto {
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ example: "test" })
  url: string;
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({ example: { test: "test" } })
  page: object;
}
