import { Injectable } from '@nestjs/common';
import { Match, Prisma, Title, User } from '@prisma/client';
import { EventEmitter2 } from 'eventemitter2';
import { PrismaService } from 'src/prisma.service';
import { SecurityService } from 'src/security/security.service';
import { UserCreateDTO } from './dto/user-create.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly crypto: SecurityService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  exclude<User, Key extends keyof User>(
    user: User,
    ...keys: Key[]
  ): Omit<User, Key> {
    for (const key of keys) {
      delete user[key];
    }
    return user;
  }

  publicUser(user: User): Partial<User> {
    return this.exclude(user, 'salt', 'password');
  }

  async create(data: UserCreateDTO): Promise<Partial<User>> {
    const encrypted = this.crypto.saltHashPassword(data.password);
    const { salt, hash: password } = encrypted;

    const user = await this.prisma.user.create({
      data: {
        ...data,
        salt,
        password,
      },
    });

    const filteredUser = this.publicUser(user);
    this.eventEmitter.emit('user.created', filteredUser);
    return filteredUser;
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<Partial<User>[]> {
    const { skip, take, cursor, where, orderBy } = params;
    const users = await this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });

    return users.map((u) => this.publicUser(u));
  }

  async user(
    input: Prisma.UserWhereUniqueInput,
  ): Promise<Partial<User> | null> {
    const user = await this.prisma.user.findUnique({
      where: input,
    });

    return this.publicUser(user);
  }

  async userMatches(id: string): Promise<Match[]> {
    return this.prisma.match.findMany({
      where: {
        participants: {
          every: {
            userId: +id,
          },
        },
      },
    });
  }

  async title(id: string): Promise<Title> {
    const titleOnUser = await this.prisma.titlesOnUsers.findFirst({
      where: {
        AND: [{ userId: +id }, { active: true }],
      },
      include: {
        title: true,
      },
    });

    return titleOnUser?.title;
  }

  async titles(id: string): Promise<Title[]> {
    const titlesOnUser = await this.prisma.titlesOnUsers.findMany({
      where: {
        userId: +id,
      },
      include: {
        title: true,
      },
    });

    return titlesOnUser.map((tou) => tou.title);
  }
}
