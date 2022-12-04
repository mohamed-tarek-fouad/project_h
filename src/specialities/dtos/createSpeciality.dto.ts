/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger/dist/decorators";
export class CreateSpecialityDto {
  @ApiProperty({ example: "mawlana" })
  id: string[];
}
