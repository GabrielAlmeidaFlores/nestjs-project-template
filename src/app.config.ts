import { readFileSync } from 'fs';
import { join } from 'path';

import fastifyCookie from '@fastify/cookie';
import multipart from '@fastify/multipart';
import {
  BadRequestException,
  ValidationPipe,
  type INestApplication,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { ApiCookieEnum } from '@shared/api/enum/api-cookie.enum';
import { ConflictErrorExceptionFilter } from '@shared/api/gateway/exception-filter/conflict.error.exception-filter';
import { ForbiddenErrorExceptionFilter } from '@shared/api/gateway/exception-filter/forbidden.error.exception-filter';
import { InvalidInputErrorExceptionFilter } from '@shared/api/gateway/exception-filter/invalid-input.error.exception-filter';
import { NotFoundErrorExceptionFilter } from '@shared/api/gateway/exception-filter/not-found.error.exception-filter';
import { UnauthorizedErrorExceptionFilter } from '@shared/api/gateway/exception-filter/unauthorized.error.exception-filter';
import { UnexpectedErrorExceptionFilter } from '@shared/api/gateway/exception-filter/unexpected.error.exception-filter';
import { TransformValidateInterceptor } from '@shared/api/gateway/interceptor/transform-validate/transform-validate.interceptor';
import { FrameworkApplicationVariable } from '@shared/system/constant/application-variable/source/framework.application-variable';

import type { NestFastifyApplication } from '@nestjs/platform-fastify';
import type { ValidationError } from 'class-validator';
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

  public applyMultipart(): this {
    const app = this.app as NestFastifyApplication<RawServerDefault>;
    void app.register(multipart);
    return this;
  }

  public applyCors(): this {
    this.app.enableCors({
      origin: FrameworkApplicationVariable.FRAMEWORK_ALLOWED_ORIGIN,
      credentials: true,
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      exposedHeaders: ['Set-Cookie'],
    });

    return this;
  }

  public applyCookies(): this {
    const app = this.app as NestFastifyApplication<RawServerDefault>;

    void app.register(fastifyCookie, {
      secret: FrameworkApplicationVariable.FRAMEWORK_COOKIES_SECRET,
    });

    return this;
  }

  public applyGlobalFilters(): this {
    this.app.useGlobalFilters(new ConflictErrorExceptionFilter());
    this.app.useGlobalFilters(new ForbiddenErrorExceptionFilter());
    this.app.useGlobalFilters(new InvalidInputErrorExceptionFilter());
    this.app.useGlobalFilters(new NotFoundErrorExceptionFilter());
    this.app.useGlobalFilters(new UnauthorizedErrorExceptionFilter());
    this.app.useGlobalFilters(new UnexpectedErrorExceptionFilter());

    return this;
  }

  public applyGlobalPrefix(): this {
    this.app.setGlobalPrefix(FrameworkApplicationVariable.FRAMEWORK_BASE_PATH);

    return this;
  }

  public applyGlobalInterceptor(): this {
    const reflector = this.app.get(Reflector);
    this.app.useGlobalInterceptors(new TransformValidateInterceptor(reflector));

    return this;
  }

  public applyGlobalPipes(): this {
    this.app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: false,
        forbidUnknownValues: false,
        transformOptions: {
          enableImplicitConversion: true,
          exposeUnsetFields: false,
        },
        exceptionFactory: (errors: ValidationError[]): BadRequestException => {
          type FlatType = {
            path: string;
            property: string;
            messages: string[];
            constraints?: Record<string, string>;
            value?: unknown;
          };

          const isIndex = (s: string): boolean => /^\d+$/.test(s);

          const joinPath = (parent: string, prop: string): string =>
            parent !== ''
              ? `${parent}${isIndex(prop) ? `[${prop}]` : `.${prop}`}`
              : prop;

          const flatten = (
            errs: ValidationError[],
            parentPath = '',
          ): FlatType[] => {
            const out: FlatType[] = [];

            for (const err of errs) {
              const prop: string = err.property;
              const currentPath = joinPath(parentPath, prop);

              if (err.constraints !== undefined) {
                const entries = Object.entries(err.constraints);
                const messages: string[] = entries.map(([, v]) => v);

                if (messages.length > 0) {
                  out.push({
                    path: currentPath,
                    property: prop,
                    messages,
                    constraints: err.constraints,
                    value: err.value as unknown,
                  });
                }
              }

              const hasChildren =
                Array.isArray(err.children) && err.children.length > 0;
              if (hasChildren) {
                out.push(
                  ...flatten(err.children as ValidationError[], currentPath),
                );
              }
            }

            return out;
          };

          const prefer: readonly string[] = [
            'IsValidValueObject',
            'isNotEmpty',
            'isEnum',
            'isString',
            'isNumber',
          ];

          const pickBest = (
            flat: FlatType[],
          ): { message: string; path: string; code: string } | null => {
            for (const key of prefer) {
              const node = flat.find((f) => f.constraints?.[key] !== undefined);
              if (node?.constraints !== undefined) {
                const msg = node.constraints[key] ?? 'Invalid value';
                return { message: msg, path: node.path, code: key };
              }
            }

            const first = flat[0];
            if (first === undefined) {
              return null;
            }

            let firstCode = 'ValidationError';
            if (first.constraints !== undefined) {
              const keys = Object.keys(first.constraints);
              if (keys.length > 0 && keys[0] !== undefined) {
                firstCode = keys[0];
              }
            }

            if (first.messages[0] !== undefined) {
              return {
                message: first.messages[0],
                path: first.path,
                code: firstCode,
              };
            }

            return null;
          };

          const flat = flatten(errors);
          if (flat.length === 0) {
            return new BadRequestException();
          }

          const best = pickBest(flat);
          if (best === null) {
            return new BadRequestException();
          }

          return new BadRequestException(best.message);
        },
      }),
    );

    return this;
  }

  public applySwagger(): this {
    const packageJson = this.loadPackageJson();

    const config = new DocumentBuilder();

    const projectTitle = packageJson.name ?? '';
    const projectDescription = packageJson.description ?? '';
    const projectVersion = packageJson.version ?? '';

    config
      .setTitle(projectTitle)
      .setDescription(projectDescription)
      .setVersion(projectVersion)
      .addSecurity('cookieAuth', {
        type: 'apiKey',
        in: 'cookie',
        name: ApiCookieEnum.AUTH_TOKEN,
      });

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
