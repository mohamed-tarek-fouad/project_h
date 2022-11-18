/* eslint-disable prettier/prettier */
import { PagesService } from "./pages.service";
import { PagesController } from "./pages.controller";

import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Concat } from "./nestedPagesConcat";

@Module({
  imports: [],
  controllers: [PagesController],
  providers: [PagesService, PrismaService, Concat],
})
export class PagesModule {}
