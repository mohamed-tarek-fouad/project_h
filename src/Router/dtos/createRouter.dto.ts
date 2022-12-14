/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger/dist/decorators";
export class CreateRouterDto {
  @ApiProperty({ example: "mawlana" })
  @IsNotEmpty()
  domainName: string;
  @ApiProperty()
  settings: Settings;
  @ApiProperty({ example: "01006388619" })
  @IsOptional()
  phoneNumber: string;
  @ApiProperty({ example: "01006388619" })
  @IsOptional()
  whatsapp: string;
  @ApiProperty()
  @IsOptional()
  schedule: Schedule;
  @ApiProperty({ example: "fayoum" })
  location: string;
  @ApiProperty({ example: 300 })
  @IsOptional()
  fees: number;
  @ApiProperty({ example: "hospital" })
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
