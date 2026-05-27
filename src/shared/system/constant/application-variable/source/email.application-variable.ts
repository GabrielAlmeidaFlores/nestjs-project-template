import { EnvironmentVariableService } from '@shared/system/constant/application-variable/implementation/environment-variable/environment-variable.service';

export class EmailApplicationVariable {
  public static readonly source = new EnvironmentVariableService();

  public static readonly EMAIL_TEMPLATE_DIR_RELATIVE_PATH =
    EmailApplicationVariable.source.getValueOrThrow<string>(
      'EMAIL_TEMPLATE_DIR_RELATIVE_PATH',
      String,
    );

  public static readonly EMAIL_SENDER =
    EmailApplicationVariable.source.getValueOrThrow<string>(
      'EMAIL_SENDER',
      String,
    );

  public static readonly APP_NAME =
    EmailApplicationVariable.source.getValueOrDefault<string>(
      'APP_NAME',
      String,
      'NestJS Template',
    );

  public static readonly APP_SUPPORT_EMAIL =
    EmailApplicationVariable.source.getValueOrDefault<string>(
      'APP_SUPPORT_EMAIL',
      String,
      'support@example.com',
    );

  public static readonly EMAIL_SIGN_IN_VERIFICATION_CODE_TEMPLATE =
    EmailApplicationVariable.source.getValueOrDefault<string>(
      'EMAIL_SIGN_IN_VERIFICATION_CODE_TEMPLATE',
      String,
      'sign-in-verification-code.html',
    );

  public static readonly EMAIL_SIGN_IN_VERIFICATION_CODE_SUBJECT =
    EmailApplicationVariable.source.getValueOrDefault<string>(
      'EMAIL_SIGN_IN_VERIFICATION_CODE_SUBJECT',
      String,
      'Verification Code',
    );

  public static readonly EMAIL_FORGOT_PASSWORD_CODE_TEMPLATE =
    EmailApplicationVariable.source.getValueOrDefault<string>(
      'EMAIL_FORGOT_PASSWORD_TEMPLATE',
      String,
      'forgot-password.html',
    );

  public static readonly EMAIL_FORGOT_PASSWORD_CODE_SUBJECT =
    EmailApplicationVariable.source.getValueOrDefault<string>(
      'EMAIL_FORGOT_PASSWORD_SUBJECT',
      String,
      'Reset Your Password',
    );

  public static readonly EMAIL_SEND_GRID_KEY =
    EmailApplicationVariable.source.getValueOrThrow<string>(
      'EMAIL_SEND_GRID_KEY',
      String,
    );

  public static readonly APP_FRONTEND_URL =
    EmailApplicationVariable.source.getValueOrThrow<string>(
      'APP_FRONTEND_URL',
      String,
    );

  protected readonly _type = EmailApplicationVariable.name;
}
