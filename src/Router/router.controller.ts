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
  Query,
  UseInterceptors,
} from "@nestjs/common";
import { RouterService } from "./router.service";
import { CreateRouterDto } from "./dtos/createRouter.dto";
import { UpdateRouterDto } from "./dtos/updateRouter.dto";
import { JwtAuthGuard } from "./../jwtAuthGuard";
import { ApiBearerAuth } from "@nestjs/swagger";
import { FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { UploadedFiles } from "@nestjs/common/decorators";
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
  @UseInterceptors(
    FilesInterceptor("images", 20, {
      preservePath: true,
      fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return cb(new Error("Only image files are allowed!"), false);
        }
        cb(null, true);
      },
      storage: diskStorage({
        destination: "./uploads",
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join("");
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  updateRouter(
    @Body() updateRouterDto: UpdateRouterDto,
    @Param("domain") domain: string,
    @UploadedFiles() images,
  ) {
    return this.routerService.updateRouter(updateRouterDto, domain, images);
  }
  @Patch("deleteImage/:domain/:images")
  deleteImages(
    @Param("domain") domain: string,
    @Param("images") images: string,
  ) {
    return this.routerService.deleteImages(domain, images);
  }
  @Get("routers/:search?")
  allRoutes(
    @Query("take") take?: string,
    @Query("skip") skip?: string,
    @Query("type") type?: string,
    @Param("search") search?: string,
  ) {
    return this.routerService.allRouters(take, skip, type, search);
  }
  @Get(":domain")
  routerbyId(@Param("domain") domain: string) {
    return this.routerService.routerById(domain);
  }
}
