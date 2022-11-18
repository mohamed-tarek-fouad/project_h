/* eslint-disable prettier/prettier */
import { IsOptional } from 'class-validator';

export class CreateRouterDto {
  domain: string;
  settings: any;
  @IsOptional()
  phoneNumber: string;
  @IsOptional()
  whatsapp: string;
  @IsOptional()
  startAt: string;
  @IsOptional()
  endAt: string;
  @IsOptional()
  days: string;
  @IsOptional()
  estimatedTime: number;
  location: string;
  @IsOptional()
  fees: number;
  type: any;
}
