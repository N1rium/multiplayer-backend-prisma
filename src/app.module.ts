import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { GameModule } from './game/game.module';
import { SecurityService } from './security/security.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [UserModule, GameModule],
  controllers: [AppController],
  providers: [AppService, SecurityService],
})
export class AppModule {}
