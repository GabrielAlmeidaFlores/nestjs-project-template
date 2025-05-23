import { readFileSync } from 'fs';
import { join } from 'path';

import { ValidationPipe, type INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { FrameworkApplicationVariable } from '@shared/system/constant/application-variable/framework.application-variable';

import type { ValidationError } from 'class-validator';
import type { PackageJson } from 'type-fest';

class AppConfigUtils {
  protected readonly _type = AppConfigUtils.name;

  protected loadPackageJson(): PackageJson | null {
    const possiblePaths = [join(process.cwd(), 'package.json')];

    for (const path of possiblePaths) {
      try {
        const packageJson = JSON.parse(
          readFileSync(path, 'utf-8'),
        ) as PackageJson;

        return packageJson;
      } catch {}
    }

    return null;
  }
}

export class AppConfig extends AppConfigUtils {
  protected override readonly _type = AppConfig.name;

  public constructor(private readonly app: INestApplication) {
    super();
  }

  public cors(): this {
    this.app.enableCors({
      origin: true,
      methods: '*',
    });

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
          excludeExtraneousValues: true,
        },
        exceptionFactory: (errors): ValidationError | undefined => {
          return errors[0];
        },
      }),
    );

    return this;
  }

  public swagger(): this {
    const packageJson = this.loadPackageJson();

    const config = new DocumentBuilder().addBearerAuth();

    if (
      packageJson &&
      packageJson.name !== undefined &&
      packageJson.description !== undefined &&
      packageJson.version !== undefined
    ) {
      config
        .setTitle(packageJson.name)
        .setDescription(packageJson.description)
        .setVersion(packageJson.version);
    }

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
