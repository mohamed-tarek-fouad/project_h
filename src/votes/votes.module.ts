/* eslint-disable prettier/prettier */
import { VotesController } from "./votes.controller";
import { VotesService } from "./votes.service";
import { Module } from "@nestjs/common";
import { PrismaService } from "./../prisma.service";

@Module({
  imports: [],
  controllers: [VotesController],
  providers: [VotesService, PrismaService],
})
export class VotesModule {}
