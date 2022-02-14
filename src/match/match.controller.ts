import { Match } from '.prisma/client';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MatchService } from './match.service';

@Controller('matches')
@ApiTags('matches')
export class MatchController {
  constructor(private readonly service: MatchService) {}

  @Get()
  matches(): Promise<Match[]> {
    return this.service.matches({});
  }

  @Get('/:id')
  byId(@Param('id') id: string): Promise<Match> {
    return this.service.match({
      id,
    });
  }
}
