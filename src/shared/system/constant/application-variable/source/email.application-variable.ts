import { EnvironmentVariableService } from '@shared/system/constant/application-variable/implementation/environment-variable/environment-variable.service';

export class EmailApplicationVariable {
  public static readonly source = new EnvironmentVariableService();

  public static readonly EMAIL_TEMPLATE_RELATIVE_PATH =
    EmailApplicationVariable.source.getValueOrThrow<string>(
      'EMAIL_TEMPLATE_RELATIVE_PATH',
      String,
    );

  public static readonly EMAIL_SENDER =
    EmailApplicationVariable.source.getValueOrThrow<string>(
      'EMAIL_SENDER',
      String,
    );

  public static readonly EMAIL_SEND_GRID_KEY =
    EmailApplicationVariable.source.getValueOrThrow<string>(
      'EMAIL_SEND_GRID_KEY',
      String,
    );

  protected readonly _type = EmailApplicationVariable.name;
}
