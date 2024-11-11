import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { handleProcessError } from './common/utils/handleProcessError';
import { AppConfigService } from './modules/app-config/app-config.service';

async function bootstrap() {
  process.on('uncaughtException', handleProcessError);
  process.on('unhandledRejection', handleProcessError);

  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableShutdownHooks();
  app.useGlobalPipes(new ValidationPipe());

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));

  const appConfig = app.get(AppConfigService);
  await app.listen(appConfig.port, appConfig.host);
}
bootstrap();
