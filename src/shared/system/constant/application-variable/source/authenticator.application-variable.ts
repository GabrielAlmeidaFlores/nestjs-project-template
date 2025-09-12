import { EnvironmentVariableService } from '@shared/system/constant/application-variable/implementation/environment-variable/environment-variable.service';

export class AuthenticatorApplicationVariable {
  public static readonly source = new EnvironmentVariableService();

  public static readonly AUTHENTICATOR_APP_NAME =
    AuthenticatorApplicationVariable.source.getValueOrThrow<string>(
      'AUTHENTICATOR_APP_NAME',
      String,
    );

  protected readonly _type = AuthenticatorApplicationVariable.name;
}
