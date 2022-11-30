/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger/dist/decorators";
export class CreateVoteDto {
  @ApiProperty()
  voteId: string;
  @ApiProperty()
  rate: number;
}
