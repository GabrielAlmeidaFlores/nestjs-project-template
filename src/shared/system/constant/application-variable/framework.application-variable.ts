import { EnvironmentVariable } from '@shared/system/constant/application-variable/utils/environment-variable.object';

export class FrameworkApplicationVariable {
  public static readonly source = new EnvironmentVariable();

  public static readonly defaultFrameworkBasePath = '';
  public static readonly defaultFrameworkHost = '127.0.0.1';
  public static readonly defaultFrameworkPort = 3000;

  public static readonly FRAMEWORK_BASE_PATH =
    FrameworkApplicationVariable.source.getOrDefault(
      'FRAMEWORK_BASE_PATH',
      String,
      FrameworkApplicationVariable.defaultFrameworkBasePath,
    );

  public static readonly FRAMEWORK_HOST =
    FrameworkApplicationVariable.source.getOrDefault(
      'FRAMEWORK_HOST',
      String,
      FrameworkApplicationVariable.defaultFrameworkHost,
    );

  public static readonly FRAMEWORK_PORT =
    FrameworkApplicationVariable.source.getOrDefault(
      'FRAMEWORK_PORT',
      Number,
      FrameworkApplicationVariable.defaultFrameworkPort,
    );

  protected readonly _type = FrameworkApplicationVariable.name;
}
