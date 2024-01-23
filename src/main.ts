// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationFilter } from './common/filters/validation.filter';
import { loggerMiddleware } from './common/middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation filter
  app.useGlobalFilters(new ValidationFilter());

  // Enable global logger middleware
  app.use(loggerMiddleware);

  await app.listen(3000);
}

bootstrap();