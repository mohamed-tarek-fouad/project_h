/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger/dist/decorators";
export class CreateVoteDto {
  @ApiProperty()
  rate: number;
}
