import { Injectable } from '@nestjs/common';
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
}
