/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreatePageDto } from "./dtos/createPage.dto";
import { HttpException } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common";
import { UpdatePageDto } from "./dtos/updatePage.dto";
import { Concat } from "./nestedPagesConcat";

@Injectable()
export class PagesService {
  constructor(private prisma: PrismaService, private concat: Concat) {}
  async createPage(createPageDto: CreatePageDto, id) {
    const pageExist = await this.prisma.pages.findFirst({
      where: {
        AND: [{ routerId: id }, { url: createPageDto.url }],
      },
    });
    if (pageExist) {
      throw new HttpException(
        "this page already exists",
        HttpStatus.BAD_REQUEST,
      );
    }
    const routerExist = await this.prisma.router.findUnique({
      where: {
        domain: id,
      },
    });
    if (!routerExist) {
      throw new HttpException(
        "this router doesn't exists",
        HttpStatus.BAD_REQUEST,
      );
    }
    const page = await this.prisma.pages.create({
      data: { ...createPageDto, routerId: id },
    });
    return page;
  }
  async updatePage(
    updatePageDto: UpdatePageDto,
    router,
    url,
    ex1,
    ex2,
    ex3,
    ex4,
    ex5,
    ex6,
  ): Promise<any> {
    url = await this.concat.ConcatString(url, ex1, ex2, ex3, ex4, ex5, ex6);

    const pageExist = await this.prisma.pages.findFirst({
      where: {
        AND: [{ routerId: router }, { url }],
      },
    });
    if (!pageExist) {
      throw new HttpException(
        "this page doesn't exists",
        HttpStatus.BAD_REQUEST,
      );
    }
    const conflictPages = await this.prisma.pages.findFirst({
      where: {
        AND: [{ routerId: router }, { url: updatePageDto.url }],
      },
    });
    if (conflictPages) {
      throw new HttpException(
        "this page url already exists",
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.prisma.pages.updateMany({
      where: {
        AND: [{ routerId: router }, { url }],
      },
      data: updatePageDto,
    });

    throw new HttpException("page updated successfully", HttpStatus.CREATED);
  }
  async pageById(router, url, ex1, ex2, ex3, ex4, ex5, ex6) {
    url = await this.concat.ConcatString(url, ex1, ex2, ex3, ex4, ex5, ex6);
    const page = await this.prisma.pages.findFirst({
      where: {
        AND: [{ routerId: router }, { url }],
      },
    });
    if (!page) {
      throw new HttpException(
        "this page doesn't exists",
        HttpStatus.BAD_REQUEST,
      );
    }
    return page;
  }
  async deletePage(router, url, ex1, ex2, ex3, ex4, ex5, ex6) {
    url = await this.concat.ConcatString(url, ex1, ex2, ex3, ex4, ex5, ex6);
    const page = await this.prisma.pages.findFirst({
      where: {
        AND: [{ routerId: router }, { url }],
      },
    });
    if (!page) {
      throw new HttpException(
        "this page doesn't exists",
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.prisma.pages.deleteMany({
      where: {
        AND: [{ routerId: router }, { url }],
      },
    });
  }
}
