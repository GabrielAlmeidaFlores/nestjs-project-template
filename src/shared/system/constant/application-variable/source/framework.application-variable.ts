import { EnvironmentVariableService } from '@shared/system/constant/application-variable/implementation/environment-variable/environment-variable.service';

export class FrameworkApplicationVariable {
  public static readonly source = new EnvironmentVariableService();

  public static readonly defaultFrameworkBasePath = '';
  public static readonly defaultFrameworkHost = '127.0.0.1';
  public static readonly defaultFrameworkPort = 3000;
  public static readonly defaultFrameworkJwtExpiration = '7d';
  public static readonly sevenDaysInSeconds = 604800;

  public static readonly FRAMEWORK_BASE_PATH =
    FrameworkApplicationVariable.source.getValueOrDefault(
      'FRAMEWORK_BASE_PATH',
      String,
      FrameworkApplicationVariable.defaultFrameworkBasePath,
    );

  public static readonly FRAMEWORK_HOST =
    FrameworkApplicationVariable.source.getValueOrDefault(
      'FRAMEWORK_HOST',
      String,
      FrameworkApplicationVariable.defaultFrameworkHost,
    );

  public static readonly FRAMEWORK_PORT =
    FrameworkApplicationVariable.source.getValueOrDefault(
      'FRAMEWORK_PORT',
      Number,
      FrameworkApplicationVariable.defaultFrameworkPort,
    );

  public static readonly FRAMEWORK_JWT_SECRET =
    FrameworkApplicationVariable.source.getValueOrThrow<string>(
      'FRAMEWORK_JWT_SECRET',
      String,
    );

  public static readonly FRAMEWORK_JWT_EXPIRATION =
    FrameworkApplicationVariable.source.getValueOrDefault<string>(
      'FRAMEWORK_JWT_EXPIRATION',
      String,
      FrameworkApplicationVariable.defaultFrameworkJwtExpiration,
    );

  public static readonly FRAMEWORK_ALLOWED_ORIGIN =
    FrameworkApplicationVariable.source.getArrayOrThrow<string>(
      'FRAMEWORK_ALLOWED_ORIGIN',
      String,
    );

  public static readonly FRAMEWORK_COOKIES_SECRET =
    FrameworkApplicationVariable.source.getValueOrThrow<string>(
      'FRAMEWORK_COOKIES_SECRET',
      String,
    );

  public static readonly FRAMEWORK_COOKIES_CONFIG_SAME_SITE =
    FrameworkApplicationVariable.source.getValueOrDefault<
      'lax' | 'none' | 'strict'
    >('FRAMEWORK_COOKIES_CONFIG_SAME_SITE', String, 'none');

  public static readonly FRAMEWORK_COOKIES_CONFIG_SECURE =
    FrameworkApplicationVariable.source.getValueOrDefault<boolean>(
      'FRAMEWORK_COOKIES_CONFIG_SECURE',
      Boolean,
      true,
    );

  public static readonly FRAMEWORK_COOKIES_CONFIG_HTTP_ONLY =
    FrameworkApplicationVariable.source.getValueOrDefault<boolean>(
      'FRAMEWORK_COOKIES_CONFIG_HTTP_ONLY',
      Boolean,
      true,
    );

  public static readonly FRAMEWORK_COOKIES_CONFIG_MAX_AGE =
    FrameworkApplicationVariable.source.getValueOrDefault<number>(
      'FRAMEWORK_COOKIES_CONFIG_MAX_AGE',
      Number,
      FrameworkApplicationVariable.sevenDaysInSeconds,
    );

  protected readonly _type = FrameworkApplicationVariable.name;
}
