import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  const logger = new Logger('Main Server');
  const app = await NestFactory.create(AppModule);
  const SERVER_PORT = process.env.SERVER_PORT || '3000';
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(SERVER_PORT);
  logger.log(`Server Listening on port ${SERVER_PORT}...`);
}
bootstrap();
