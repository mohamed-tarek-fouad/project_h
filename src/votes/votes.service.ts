/* eslint-disable prettier/prettier */

import { Injectable } from "@nestjs/common";
import { CreateVoteDto } from "./dtos/createvote.dto";
import { PrismaService } from "./../prisma.service";
import { HttpStatus } from "@nestjs/common";
import { HttpException } from "@nestjs/common";

@Injectable()
export class VotesService {
  constructor(private prisma: PrismaService) {}
  async createVote(createVoteDto: CreateVoteDto, req) {
    const routeExist = await this.prisma.router.findUnique({
      where: {
        domain: createVoteDto.voteId,
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
        AND: [{ voteId: createVoteDto.voteId }, { userId: req.user.userId }],
      },
    });
    if (vote) {
      const updatedVote = await this.prisma.votes.updateMany({
        where: {
          AND: [{ voteId: createVoteDto.voteId }, { userId: req.user.userId }],
        },
        data: {
          ...createVoteDto,
          userId: parseInt(req.user.userId),
        },
      });
      return updatedVote;
    } else {
      const createdVote = await this.prisma.votes.create({
        data: {
          ...createVoteDto,
          userId: parseInt(req.user.userId),
        },
      });
      return createdVote;
    }
  }
  async allVotes() {
    const votes = await this.prisma.votes.findMany({});
    return votes;
  }
}
