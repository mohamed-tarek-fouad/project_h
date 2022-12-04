/* eslint-disable prettier/prettier */
import { IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger/dist/decorators";
export class CreateRouterDto {
  @ApiProperty({ example: "mawlana" })
  domainName: string;
  @ApiProperty({ example: { test: "test" } })
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
  type: any;
}
