import { NestFactory } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';

import { AppConfig } from '@base/app.config';
import { AppModule } from '@base/app.module';
import { FrameworkApplicationVariable } from '@shared/system/constant/application-variable/framework.application-variable';
import { NodeApplicationVariable } from '@shared/system/constant/application-variable/node.application-variable';

import type { NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const appConfig = new AppConfig(app);
  appConfig.cors().globalPrefix().globalPipes();

  const runningInProductionEnvironment =
    NodeApplicationVariable.PRODUCTION_ENVIRONMENT === true;

  if (runningInProductionEnvironment) {
    appConfig.swagger();
  }

  await app.listen(
    FrameworkApplicationVariable.FRAMEWORK_PORT,
    FrameworkApplicationVariable.FRAMEWORK_HOST,
  );
}

void bootstrap();
