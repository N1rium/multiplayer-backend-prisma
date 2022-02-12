import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SecurityService } from 'src/security/security.service';
import { LoginDTO } from './dto/login.dto';
import { TokenDTO } from './dto/token.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly crypto: SecurityService,
    private readonly prisma: PrismaService,
  ) {}

  async token(data: LoginDTO): Promise<TokenDTO> {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    const { salt, password: storedPassword } = user;
    const encrypted = this.crypto.sha512(data.password, salt);

    if (storedPassword !== encrypted.hash) {
      throw new UnauthorizedException();
    }

    const token = jwt.sign(
      {
        username: user.username,
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
    );

    return { token };
  }
}
