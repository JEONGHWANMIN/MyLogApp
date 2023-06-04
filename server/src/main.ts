import { ValidationPipe, ValidationPipeOptions } from '@nestjs/common';
import { Tspec, TspecDocsMiddleware } from 'tspec';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const validationOptions: ValidationPipeOptions = {
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
};

const tespecConfigOptions: Tspec.GenerateParams = {};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use('/docs', await TspecDocsMiddleware(tespecConfigOptions));
  app.useGlobalPipes(new ValidationPipe(validationOptions));
  await app.listen(8080);
}
bootstrap();
