import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:4000', // Replace with the allowed origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies
    allowedHeaders: 'Content-Type, Authorization',
  });

  app.use(bodyParser.json({limit: '50mb'}))
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
