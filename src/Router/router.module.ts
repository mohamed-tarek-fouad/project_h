/* eslint-disable prettier/prettier */
import { RouterService } from "./router.service";
import { RouterController } from "./router.controller";
import { Module } from "@nestjs/common";
import { PrismaService } from "./../prisma.service";

@Module({
  imports: [],
  controllers: [RouterController],
  providers: [RouterService, PrismaService],
})
export class RouterModule {}
