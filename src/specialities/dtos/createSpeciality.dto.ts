/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { IsNotEmpty } from "class-validator";
export class CreateSpecialityDto {
  @ApiProperty({ example: "mawlana" })
  @IsNotEmpty()
  id: string[];
}
