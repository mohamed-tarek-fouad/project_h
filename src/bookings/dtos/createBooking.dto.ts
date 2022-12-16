/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { IsNotEmpty } from "class-validator";
export class CreateBookingDto {
  @ApiProperty({ example: "mawlana" })
  @IsNotEmpty()
  details: object;
}
