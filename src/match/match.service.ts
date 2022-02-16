import { Match, Prisma, User } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventEmitter2 } from 'eventemitter2';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class MatchService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async match(input: Prisma.MatchWhereUniqueInput): Promise<Match> {
    return this.prisma.match.findUnique({
      where: input,
    });
  }

  async matches(input: Prisma.MatchFindManyArgs): Promise<Match[]> {
    return this.prisma.match.findMany(input);
  }

  @OnEvent('user.created')
  onUserCreated(payload: Partial<User>) {
    console.log('User created event: ', payload);
  }
}
