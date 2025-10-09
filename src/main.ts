import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';

import { AppConfig } from '@base/app.config';
import { AppModule } from '@base/app.module';
import { FrameworkApplicationVariable } from '@shared/system/constant/application-variable/source/framework.application-variable';
import { NodeApplicationVariable } from '@shared/system/constant/application-variable/source/node.application-variable';

import type { NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const appConfig = new AppConfig(app);
  appConfig
    .applyMultipart()
    .applyCors()
    .applyCookies()
    .applyGlobalInterceptor()
    .applyGlobalPrefix()
    .applyGlobalPipes()
    .applyGlobalFilters();

  if (!NodeApplicationVariable.PRODUCTION_ENVIRONMENT) {
    appConfig.applySwagger();
  }

  await app.listen(
    FrameworkApplicationVariable.FRAMEWORK_PORT,
    FrameworkApplicationVariable.FRAMEWORK_HOST,
  );
}

void bootstrap();
