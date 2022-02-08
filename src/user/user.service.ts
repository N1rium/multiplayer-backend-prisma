import { Injectable } from '@nestjs/common';
import { Prisma, Title } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { SecurityService } from 'src/security/security.service';
import { CreateUserDTO } from './dto/user-create.dto';
import { UserPublic } from './dto/user-public.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly crypto: SecurityService,
  ) {}

  async create(data: CreateUserDTO): Promise<UserPublic> {
    const encrypted = this.crypto.saltHashPassword(data.password);
    const { salt, hash: password } = encrypted;

    return this.prisma.user.create({
      data: { ...data, salt, password },
      select: {
        id: true,
        username: true,
      },
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<UserPublic[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      select: {
        id: true,
        username: true,
      },
    });
  }

  async user(input: Prisma.UserWhereUniqueInput): Promise<UserPublic | null> {
    return this.prisma.user.findUnique({
      where: input,
      select: {
        id: true,
        username: true,
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
