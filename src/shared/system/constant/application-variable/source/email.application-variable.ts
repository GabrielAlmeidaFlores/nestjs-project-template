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
      'Agiliza Previ - Código de verificação',
    );

  public static readonly EMAIL_FORGOT_PASSWORD_CODE_TEMPLATE =
    EmailApplicationVariable.source.getValueOrDefault<string>(
      'EMAIL_FORGOT_PASSWORD_TEMPLATE',
      String,
      'forgot-password.html',
    );

  public static readonly EMAIL_PAYMENT_PLAN_PURCHASE_TEMPLATE =
    EmailApplicationVariable.source.getValueOrDefault<string>(
      'EMAIL_PAYMENT_PLAN_PURCHASE_TEMPLATE',
      String,
      'payment-plan-purchase.html',
    );

  public static readonly EMAIL_FORGOT_PASSWORD_CODE_SUBJECT =
    EmailApplicationVariable.source.getValueOrDefault<string>(
      'EMAIL_FORGOT_PASSWORD_SUBJECT',
      String,
      'Agiliza Previ - Esqueceu senha',
    );
  public static readonly EMAIL_SEND_GRID_KEY =
    EmailApplicationVariable.source.getValueOrThrow<string>(
      'EMAIL_SEND_GRID_KEY',
      String,
    );

  protected readonly _type = EmailApplicationVariable.name;
}
