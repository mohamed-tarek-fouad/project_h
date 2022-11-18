/* eslint-disable prettier/prettier */
import { Post, Body, Param, Patch, Get, Delete } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { CreatePageDto } from "./dtos/createPage.dto";
import { PagesService } from "./pages.service";
import { UpdatePageDto } from "./dtos/updatePage.dto";

@Controller("pages")
export class PagesController {
  constructor(private pagesService: PagesService) {}
  @Post(":id")
  createPage(@Body() createPageDto: CreatePageDto, @Param("id") id: string) {
    return this.pagesService.createPage(createPageDto, id);
  }
  @Patch("update/:router/:url/:ex1?/:ex2?/:ex3?/:ex4?/:ex5?/:ex6?")
  updatePage(
    @Body() updatePageDto: UpdatePageDto,
    @Param("router") router: string,
    @Param("url") url: string,
    @Param("ex1") ex1: string,
    @Param("ex2") ex2: string,
    @Param("ex3") ex3: string,
    @Param("ex4") ex4: string,
    @Param("ex5") ex5: string,
    @Param("ex6") ex6: string,
  ) {
    return this.pagesService.updatePage(
      updatePageDto,
      router,
      url,
      ex1,
      ex2,
      ex3,
      ex4,
      ex5,
      ex6,
    );
  }
  @Get(":router/:url/:ex1?/:ex2?/:ex3?/:ex4?/:ex5?/:ex6?")
  pageById(
    @Param("router") router: string,
    @Param("url") url: string,
    @Param("ex1") ex1: string,
    @Param("ex2") ex2: string,
    @Param("ex3") ex3: string,
    @Param("ex4") ex4: string,
    @Param("ex5") ex5: string,
    @Param("ex6") ex6: string,
  ) {
    return this.pagesService.pageById(
      router,
      url,
      ex1,
      ex2,
      ex3,
      ex4,
      ex5,
      ex6,
    );
  }
  @Delete("delete/:router/:url/:ex1?/:ex2?/:ex3?/:ex4?/:ex5?/:ex6?")
  deletePage(
    @Param("router") router: string,
    @Param("url") url: string,
    @Param("ex1") ex1: string,
    @Param("ex2") ex2: string,
    @Param("ex3") ex3: string,
    @Param("ex4") ex4: string,
    @Param("ex5") ex5: string,
    @Param("ex6") ex6: string,
  ) {
    return this.pagesService.deletePage(
      router,
      url,
      ex1,
      ex2,
      ex3,
      ex4,
      ex5,
      ex6,
    );
  }
}
