import { EnvironmentVariableService } from '@shared/system/constant/application-variable/implementation/environment-variable/environment-variable.service';

export class SignozApplicationVariable {
  public static readonly source = new EnvironmentVariableService();

  public static readonly defaultSignozEndpoint = 'http://localhost:4318';
  public static readonly defaultServiceName = 'agiliza-previ-back';

  public static readonly SIGNOZ_ENDPOINT =
    SignozApplicationVariable.source.getValueOrDefault(
      'SIGNOZ_ENDPOINT',
      String,
      SignozApplicationVariable.defaultSignozEndpoint,
    );

  public static readonly SIGNOZ_SERVICE_NAME =
    SignozApplicationVariable.source.getValueOrDefault(
      'SIGNOZ_SERVICE_NAME',
      String,
      SignozApplicationVariable.defaultServiceName,
    );

  public static readonly SIGNOZ_ENABLED =
    SignozApplicationVariable.source.getValueOrDefault<boolean>(
      'SIGNOZ_ENABLED',
      Boolean,
      false,
    );

  public static readonly SIGNOZ_ACCESS_TOKEN =
    SignozApplicationVariable.source.getValueOrDefault(
      'SIGNOZ_ACCESS_TOKEN',
      String,
      '',
    );

  protected readonly _type = SignozApplicationVariable.name;
}
