import { readFileSync } from 'fs';
import { join } from 'path';

import fastifyCookie from '@fastify/cookie';
import {
  BadRequestException,
  ValidationPipe,
  type INestApplication,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { ForbiddenErrorExceptionFilter } from '@shared/api/exception-filter/forbidden.error.exception-filter';
import { InvalidInputErrorExceptionFilter } from '@shared/api/exception-filter/invalid-input.error.exception-filter';
import { NotFoundErrorExceptionFilter } from '@shared/api/exception-filter/not-found.error.exception-filter';
import { UnauthorizedErrorExceptionFilter } from '@shared/api/exception-filter/unauthorized.error.exception-filter';
import { UnexpectedErrorExceptionFilter } from '@shared/api/exception-filter/unexpected.error.exception-filter';
import { FrameworkApplicationVariable } from '@shared/system/constant/application-variable/framework.application-variable';

import type { NestFastifyApplication } from '@nestjs/platform-fastify';
import type { RawServerDefault } from 'fastify';
import type { PackageJson } from 'type-fest';

class AppConfigUtils {
  protected readonly _type = AppConfigUtils.name;

  protected loadPackageJson(): PackageJson {
    const currentWorkingDir = process.cwd();
    const packageJsonPath = join(currentWorkingDir, 'package.json');
    const packageJsonAsString = readFileSync(packageJsonPath, 'utf-8');
    return JSON.parse(packageJsonAsString) as PackageJson;
  }
}

export class AppConfig extends AppConfigUtils {
  protected override readonly _type = AppConfig.name;

  public constructor(private readonly app: INestApplication) {
    super();
  }
  public cors(): this {
    this.app.enableCors({
      origin: FrameworkApplicationVariable.FRAMEWORK_CORS_ALLOWED_ORIGIN,
      credentials: true,
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      exposedHeaders: ['Set-Cookie'],
    });

    return this;
  }

  public cookies(): this {
    const app = this.app as NestFastifyApplication<RawServerDefault>;

    void app.register(fastifyCookie, {
      secret: FrameworkApplicationVariable.FRAMEWORK_COOKIES_SECRET,
    });

    return this;
  }

  public globalApiFilters(): this {
    this.app.useGlobalFilters(new ForbiddenErrorExceptionFilter());
    this.app.useGlobalFilters(new InvalidInputErrorExceptionFilter());
    this.app.useGlobalFilters(new NotFoundErrorExceptionFilter());
    this.app.useGlobalFilters(new UnauthorizedErrorExceptionFilter());
    this.app.useGlobalFilters(new UnexpectedErrorExceptionFilter());

    return this;
  }

  public globalPrefix(): this {
    this.app.setGlobalPrefix(FrameworkApplicationVariable.FRAMEWORK_BASE_PATH);

    return this;
  }

  public globalPipes(): this {
    this.app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
        exceptionFactory: (errors): BadRequestException => {
          const firstError = errors[0];
          const firstErrorConstraints = firstError?.constraints;

          if (firstErrorConstraints) {
            const message = Object.values(firstErrorConstraints);

            return new BadRequestException(message[0]);
          }

          return new BadRequestException();
        },
      }),
    );

    return this;

    return this;
  }

  public swagger(): this {
    const packageJson = this.loadPackageJson();

    const config = new DocumentBuilder();

    const projectTitle = packageJson.name ?? '';
    const projectDescription = packageJson.description ?? '';
    const projectVersion = packageJson.version ?? '';

    config
      .addBearerAuth()
      .setTitle(projectTitle)
      .setDescription(projectDescription)
      .setVersion(projectVersion);

    const build = config.build();

    const document = SwaggerModule.createDocument(this.app, build);
    SwaggerModule.setup(
      `${FrameworkApplicationVariable.FRAMEWORK_BASE_PATH}/docs`,
      this.app,
      document,
    );

    return this;
  }
}
