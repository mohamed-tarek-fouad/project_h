/* eslint-disable prettier/prettier */
import {
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  MinLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger/dist/decorators";
export class CreateRouterDto {
  @ApiProperty({ example: "mawlana" })
  @IsNotEmpty()
  @MinLength(5)
  domainName: string;
  @ApiProperty()
  @IsNotEmpty()
  settings: Settings;
  @IsNotEmpty()
  @IsPhoneNumber()
  @ApiProperty({ example: "01006388619" })
  @IsOptional()
  phoneNumber: string;
  @IsNotEmpty()
  @ApiProperty({ example: "01006388619" })
  @IsOptional()
  whatsapp: string;
  @IsNotEmpty()
  @ApiProperty()
  @IsOptional()
  schedule: Schedule;
  @ApiProperty({ example: "fayoum" })
  @IsNotEmpty()
  location: string;
  @ApiProperty({ example: 300 })
  @IsNotEmpty()
  @IsOptional()
  fees: number;
  @ApiProperty({ example: "hospital" })
  @IsNotEmpty()
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
