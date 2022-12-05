/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, UseGuards, Param } from "@nestjs/common";
import { VotesService } from "./votes.service";
import { CreateVoteDto } from "./dtos/createvote.dto";
import { JwtAuthGuard } from "./../jwtAuthGuard";
import { Req } from "@nestjs/common";

@Controller("votes")
export class VotesController {
  constructor(private votesService: VotesService) {}
  @UseGuards(JwtAuthGuard)
  @Post(":domain")
  createVote(
    @Body() voteDto: CreateVoteDto,
    @Param("domain") domain: string,
    @Req() req,
  ) {
    return this.votesService.createVote(voteDto, domain, req);
  }
  @Get("")
  allVotes() {
    return this.votesService.allVotes();
  }
}
