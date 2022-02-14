import { Match, Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MatchService {
  constructor(private readonly prisma: PrismaService) {}

  async match(input: Prisma.MatchWhereUniqueInput): Promise<Match> {
    return this.prisma.match.findUnique({
      where: input,
    });
  }

  async matches(input: Prisma.MatchFindManyArgs): Promise<Match[]> {
    return this.prisma.match.findMany(input);
  }
}
