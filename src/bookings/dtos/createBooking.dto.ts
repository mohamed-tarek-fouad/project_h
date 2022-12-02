/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger/dist/decorators";
export class CreateBookingDto {
  @ApiProperty({ example: "mawlana" })
  details: object;
}
