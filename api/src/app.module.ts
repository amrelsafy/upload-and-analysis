import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import ApiControllers from './api';
import { AuthModule } from './application/auth/auth.module';
import { DatabaseModule } from './persistance/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AuthModule, DatabaseModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: ApiControllers,
  providers: [AppService],
})
export class AppModule {}
