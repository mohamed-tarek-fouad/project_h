/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { IsOptional } from "class-validator";

export class UpdateRouterDto {
  @ApiProperty({ example: "mawlana" })
  @IsOptional()
  domainName: string;
  @ApiProperty({ example: { test: "test" } })
  @IsOptional()
  settings: any;
  @ApiProperty({ example: "01006388619" })
  @IsOptional()
  phoneNumber: string;
  @ApiProperty({ example: "01006388619" })
  @IsOptional()
  whatsapp: string;
  @ApiProperty()
  @IsOptional()
  schedual: object;
  @ApiProperty({ example: "fayoum" })
  location: string;
  @ApiProperty({ example: 300 })
  @IsOptional()
  fees: number;
  @ApiProperty({ example: "hospital" })
  @IsOptional()
  type: any;
}
