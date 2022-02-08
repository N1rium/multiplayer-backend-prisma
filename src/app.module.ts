import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { SecurityService } from './security/security.service';

@Module({
  imports: [UserModule],
  providers: [AppService, SecurityService],
})
export class AppModule {}
