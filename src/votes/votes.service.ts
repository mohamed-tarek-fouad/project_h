/* eslint-disable prettier/prettier */

import { Injectable } from "@nestjs/common";
import { CreateVoteDto } from "./dtos/createvote.dto";
import { PrismaService } from "./../prisma.service";
import { HttpStatus } from "@nestjs/common";
import { HttpException } from "@nestjs/common";

@Injectable()
export class VotesService {
  constructor(private prisma: PrismaService) {}
  async createVote(createVoteDto: CreateVoteDto, domain: string, req) {
    try {
      const routeExist = await this.prisma.router.findUnique({
        where: {
          domain,
        },
      });
      if (!routeExist) {
        throw new HttpException(
          "this router doesn't exist",
          HttpStatus.BAD_REQUEST,
        );
      }
      if (createVoteDto.rate > 5 || createVoteDto.rate < 1) {
        throw new HttpException(
          "rate must be from 1 to 5",
          HttpStatus.BAD_REQUEST,
        );
      }
      const vote = await this.prisma.votes.findFirst({
        where: {
          AND: [{ voteId: domain }, { userId: req.user.userId }],
        },
      });
      if (vote) {
        const updatedVote = await this.prisma.votes.updateMany({
          where: {
            AND: [{ voteId: domain }, { userId: req.user.userId }],
          },
          data: {
            ...createVoteDto,
          },
        });

        const totalRating =
          (routeExist.totalRating * routeExist.rating + createVoteDto.rate) /
          (routeExist.rating + 1);
        await this.prisma.router.update({
          where: {
            domain,
          },
          data: {
            rating: routeExist.rating - createVoteDto.rate,
            totalRating,
          },
        });
        return { ...updatedVote, message: "vote updated successfully" };
      } else {
        const createdVote = await this.prisma.votes.create({
          data: {
            ...createVoteDto,
            userId: req.user.userId,
            voteId: domain,
          },
        });

        const totalRating =
          (routeExist.totalRating * routeExist.rating + createVoteDto.rate) /
          (routeExist.rating + 1);
        await this.prisma.router.update({
          where: {
            domain,
          },
          data: {
            totalRating,
            voters: routeExist.voters + 1,
            rating: routeExist.rating + createVoteDto.rate,
          },
        });
        return { ...createdVote, message: "vote created successfully" };
      }
    } catch (err) {
      return err;
    }
  }
  async allVotes() {
    try {
      const votes = await this.prisma.votes.findMany({});
      return votes;
    } catch (err) {
      return err;
    }
  }
}
