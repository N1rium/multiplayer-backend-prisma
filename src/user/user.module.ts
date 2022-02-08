import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SecurityService } from 'src/security/security.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, SecurityService],
})
export class UserModule {}
