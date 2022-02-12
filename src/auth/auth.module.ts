import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SecurityService } from 'src/security/security.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, SecurityService, PrismaService],
})
export class AuthModule {}
