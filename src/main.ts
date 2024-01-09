import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './transform.interceptor';
import { SERVER_PORT } from './config/constants';

async function bootstrap() {
  const logger = new Logger('Main Server');
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(SERVER_PORT);
  logger.log(`Server Listening on port ${SERVER_PORT}...`);
}
bootstrap();
