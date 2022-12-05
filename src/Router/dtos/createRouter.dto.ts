/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger/dist/decorators";
export class CreateRouterDto {
  @ApiProperty({ example: "mawlana" })
  @IsNotEmpty()
  domainName: string;
  @ApiProperty()
  settings: any;
  @ApiProperty({ example: "01006388619" })
  @IsOptional()
  phoneNumber: string;
  @ApiProperty({ example: "01006388619" })
  @IsOptional()
  whatsapp: string;
  @ApiProperty()
  @IsOptional()
  schedule: any;
  @ApiProperty({ example: "fayoum" })
  location: string;
  @ApiProperty({ example: 300 })
  @IsOptional()
  fees: number;
  @ApiProperty({ example: "hospital" })
  type: any;
}
