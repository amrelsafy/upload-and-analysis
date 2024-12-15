import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppService } from './app.service';
import ApiControllers from './api';
import { AuthModule } from './application/auth/auth.module';
import { DatabaseModule } from './persistance/database.module';
import { ConfigModule } from '@nestjs/config';
import FilesMiddleware from './middlewares/FilesMiddleware';
import QueueModule from './application/upload/queue.module';
import FileModule from './application/file/file.module';

@Module({
  imports: [AuthModule, DatabaseModule, ConfigModule.forRoot({ isGlobal: true }), QueueModule, FileModule],
  controllers: ApiControllers,
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(FilesMiddleware).forRoutes('upload')
  }
  
}
