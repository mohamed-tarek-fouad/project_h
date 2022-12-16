/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { IsNotEmpty, IsOptional, IsPhoneNumber } from "class-validator";

export class UpdateRouterDto {
  @ApiProperty({ example: "mawlana" })
  @IsNotEmpty()
  @IsOptional()
  domainName: string;
  @ApiProperty({ example: { test: "test" } })
  @IsOptional()
  @IsNotEmpty()
  settings: Settings;
  @IsNotEmpty()
  @IsPhoneNumber()
  @ApiProperty({ example: "01006388619" })
  @IsOptional()
  phoneNumber: string;
  @ApiProperty({ example: "01006388619" })
  @IsNotEmpty()
  @IsOptional()
  whatsapp: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  schedule: Schedule;
  @ApiProperty({ example: "fayoum" })
  @IsNotEmpty()
  location: string;
  @ApiProperty({ example: 300 })
  @IsNotEmpty()
  @IsOptional()
  fees: number;
  @IsNotEmpty()
  @ApiProperty({ example: "hospital" })
  @IsOptional()
  type: Speciality;
}
type Schedule = {
  startAt: string;
  endAt: string;
  days: string[];
  estimatedTime: number;
};

type Settings = {
  themes: string;
};
enum Speciality {
  hospital = "hospital",
  clinic = "clinic",
  lab = "lab",
}
