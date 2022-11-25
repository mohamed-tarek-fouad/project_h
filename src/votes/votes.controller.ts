/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { VotesService } from "./votes.service";
import { CreateVoteDto } from "./dtos/createvote.dto";
import { JwtAuthGuard } from "./../jwtAuthGuard";
import { Req } from "@nestjs/common";

@Controller("votes")
export class VotesController {
  constructor(private votesService: VotesService) {}
  @UseGuards(JwtAuthGuard)
  @Post("")
  createVote(@Body() voteDto: CreateVoteDto, @Req() req) {
    return this.votesService.createVote(voteDto, req);
  }
  @Get("")
  allVotes() {
    return this.votesService.allVotes();
  }
}
