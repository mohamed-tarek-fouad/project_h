/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger/dist/decorators";
export class CreatePageDto {
  @ApiProperty({ example: "mawlana" })
  url: string;
  @ApiProperty({ example: { test: "test" } })
  page: object;
}
