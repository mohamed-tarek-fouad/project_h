/* eslint-disable prettier/prettier */

import { IsOptional } from "class-validator";

export class UpdatePageDto {
  @IsOptional()
  url: string;
  @IsOptional()
  page: object;
}
