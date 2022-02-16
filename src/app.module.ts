import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SecurityService } from './security/security.service';
import { AuthModule } from './auth/auth.module';
import { MatchModule } from './match/match.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [UserModule, AuthModule, MatchModule, EventEmitterModule.forRoot()],
  providers: [AppService, SecurityService],
})
export class AppModule {}
