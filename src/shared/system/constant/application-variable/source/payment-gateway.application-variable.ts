import { EnvironmentVariableService } from '@shared/system/constant/application-variable/implementation/environment-variable/environment-variable.service';

export class PaymentGatewayApplicationVariable {
  public static readonly source = new EnvironmentVariableService();

  public static readonly BANK_API_DOMAIN =
    PaymentGatewayApplicationVariable.source.getValueOrThrow<string>(
      'BANK_API_DOMAIN',
      String,
    );

  public static readonly BANK_ACCESS_TOKEN =
    PaymentGatewayApplicationVariable.source.getValueOrThrow<string>(
      'BANK_ACCESS_TOKEN',
      String,
    );

  public static readonly BANK_WEBHOOK_ENDPOINT_ACCESS_TOKEN =
    PaymentGatewayApplicationVariable.source.getValueOrThrow<string>(
      'BANK_WEBHOOK_ENDPOINT_ACCESS_TOKEN',
      String,
    );

  protected readonly _type = PaymentGatewayApplicationVariable.name;
}
