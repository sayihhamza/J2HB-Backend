import { NestFactory } from '@nestjs/core';
import { SeriesModule } from './modules/series/series.module';
import { ValidationFilter } from './common/filters/validation.filter';
import { loggerMiddleware } from './common/middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(SeriesModule);

  app.useGlobalFilters(new ValidationFilter());
  app.use(loggerMiddleware);
  app.enableCors();

  await app.listen(3030);
}

bootstrap();