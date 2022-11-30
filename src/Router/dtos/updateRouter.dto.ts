/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { IsOptional } from "class-validator";

export class UpdateRouterDto {
  @ApiProperty({ example: "mawlana" })
  @IsOptional()
  domain: string;
  @ApiProperty({ example: { test: "test" } })
  @IsOptional()
  settings: any;
  @ApiProperty({ example: "01006388619" })
  @IsOptional()
  phoneNumber: string;
  @ApiProperty({ example: "01006388619" })
  @IsOptional()
  whatsapp: string;
  @ApiProperty({ example: "2022-11-29T22:52:49.649Z" })
  @IsOptional()
  startAt: string;
  @ApiProperty({ example: "2022-11-29T22:52:49.649Z" })
  @IsOptional()
  endAt: string;
  @ApiProperty({ example: "sat,mon" })
  @IsOptional()
  days: string;
  @ApiProperty({ example: 20 })
  @IsOptional()
  estimatedTime: number;
  @ApiProperty({ example: "fayoum" })
  location: string;
  @ApiProperty({ example: 300 })
  @IsOptional()
  fees: number;
  @ApiProperty({ example: "hospital" })
  @IsOptional()
  type: any;
}
