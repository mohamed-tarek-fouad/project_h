/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreatePageDto } from "./dtos/createPage.dto";
import { HttpException } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common";
import { UpdatePageDto } from "./dtos/updatePage.dto";
import { Concat } from "./nestedPagesConcat";
import { Inject } from "@nestjs/common";
import { CACHE_MANAGER } from "@nestjs/common";
import { Cache } from "cache-manager";

@Injectable()
export class PagesService {
  constructor(
    private prisma: PrismaService,
    private concat: Concat,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async createPage(createPageDto: CreatePageDto, id: string) {
    try {
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
      await this.cacheManager.del(createPageDto.url);
      return { ...page, message: "page created successfully" };
    } catch (err) {
      return err;
    }
  }
  async updatePage(
    updatePageDto: UpdatePageDto,
    router: string,
    url: string,
    ex1: string,
    ex2: string,
    ex3: string,
    ex4: string,
    ex5: string,
    ex6: string,
  ): Promise<any> {
    try {
      url = await this.concat.ConcatString(url, ex1, ex2, ex3, ex4, ex5, ex6);
      const isCached = await this.cacheManager.get(url);
      if (isCached) {
        return { isCached, message: "fetched page successfully" };
      }
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
      await this.cacheManager.del(url);

      return { message: "updated page successfully" };
    } catch (err) {
      return err;
    }
  }
  async pageById(
    router: string,
    url: string,
    ex1: string,
    ex2: string,
    ex3: string,
    ex4: string,
    ex5: string,
    ex6: string,
  ) {
    try {
      url = await this.concat.ConcatString(url, ex1, ex2, ex3, ex4, ex5, ex6);
      const isCached = await this.cacheManager.get(url);
      if (isCached) {
        return { isCached, message: "fetched page successfully" };
      }
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
      await this.cacheManager.set("page", url);
      return { ...page, message: "page fetched successfully" };
    } catch (err) {
      return err;
    }
  }
  async deletePage(
    router: string,
    url: string,
    ex1: string,
    ex2: string,
    ex3: string,
    ex4: string,
    ex5: string,
    ex6: string,
  ) {
    try {
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
      await this.cacheManager.del(url);
      return { message: "page deleted successfully" };
    } catch (err) {
      return err;
    }
  }
}
