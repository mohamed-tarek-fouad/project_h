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
@Controller("router")
export class RouterController {
  constructor(private routerService: RouterService) {}
  @UseGuards(JwtAuthGuard)
  @Post("")
  createRouter(@Body() createRouterDto: CreateRouterDto, @Req() req) {
    return this.routerService.createRouter(createRouterDto, req);
  }
  @Patch("update/:domain")
  updateRouter(
    @Body() updateRouterDto: UpdateRouterDto,
    @Param("domain") domain: string,
  ) {
    return this.routerService.updateRouter(updateRouterDto, domain);
  }
  @Get("")
  allRoutes() {
    return this.routerService.allRouters();
  }
  @Get(":domain")
  routerbyId(@Param("domain") domain: string) {
    return this.routerService.routerById(domain);
  }
}
