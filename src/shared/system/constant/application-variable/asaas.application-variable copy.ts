import { EnvironmentVariable } from '@shared/system/constant/application-variable/utils/environment-variable.object';

export class AsaasApplicationVariable {
  public static readonly source = new EnvironmentVariable();

  public static readonly ASAAS_URL =
    AsaasApplicationVariable.source.getOrThrow<string>('ASAAS_URL', String);

  public static readonly BANK_ACCESS_TOKEN =
    AsaasApplicationVariable.source.getOrThrow<string>(
      'BANK_ACCESS_TOKEN',
      String,
    );

  protected readonly _type = AsaasApplicationVariable.name;
}
