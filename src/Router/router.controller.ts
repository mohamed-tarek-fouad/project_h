/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Body,
  Param,
  Patch,
  Get,
  Req,
  UseGuards,
} from "@nestjs/common";
import { RouterService } from "./router.service";
import { CreateRouterDto } from "./dtos/createRouter.dto";
import { UpdateRouterDto } from "./dtos/updateRouter.dto";
import { JwtAuthGuard } from "./../jwtAuthGuard";
import { ApiBearerAuth } from "@nestjs/swagger";
@Controller("router")
export class RouterController {
  constructor(private routerService: RouterService) {}
  @ApiBearerAuth("access-token")
  @UseGuards(JwtAuthGuard)
  @Post("")
  createRouter(@Body() createRouterDto: CreateRouterDto, @Req() req) {
    return this.routerService.createRouter(createRouterDto, req);
  }
  @ApiBearerAuth("access-token")
  @Patch("update/:domain")
  updateRouter(
    @Body() updateRouterDto: UpdateRouterDto,
    @Param("domain") domain: number,
  ) {
    return this.routerService.updateRouter(updateRouterDto, domain);
  }
  @Get("")
  allRoutes() {
    return this.routerService.allRouters();
  }
  @Get(":domain")
  routerbyId(@Param("domain") domain: number) {
    return this.routerService.routerById(domain);
  }
}
