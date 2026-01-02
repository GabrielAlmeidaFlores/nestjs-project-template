import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';

import { AppConfig } from '@base/app.config';
import { AppModule } from '@base/app.module';
import { FrameworkApplicationVariable } from '@shared/system/constant/application-variable/source/framework.application-variable';

import type { NestFastifyApplication } from '@nestjs/platform-fastify';

const BYTES_PER_KB = 1024;
const KB_PER_MB = 1024;
const MB_PER_GB = 1024;
const MAX_BODY_SIZE_GB = 10;
const MAX_BODY_SIZE_BYTES =
  MAX_BODY_SIZE_GB * MB_PER_GB * KB_PER_MB * BYTES_PER_KB;

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      bodyLimit: MAX_BODY_SIZE_BYTES,
    }),
  );

  const appConfig = new AppConfig(app);
  appConfig
    .applyMultipart()
    .applyCors()
    .applyCookies()
    .applyGlobalInterceptor()
    .applyGlobalPrefix()
    .applyGlobalPipes()
    .applyGlobalFilters()
    .applySwagger();

  await app.listen(
    FrameworkApplicationVariable.FRAMEWORK_PORT,
    FrameworkApplicationVariable.FRAMEWORK_HOST,
  );
}

void bootstrap();
