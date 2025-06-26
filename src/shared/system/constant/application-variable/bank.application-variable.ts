import { EnvironmentVariable } from '@shared/system/constant/application-variable/utils/environment-variable.object';

export class BankApplicationVariable {
  public static readonly source = new EnvironmentVariable();

  public static readonly BANK_URL =
    BankApplicationVariable.source.getValueOrThrow<string>('BANK_URL', String);

  public static readonly BANK_ACCESS_TOKEN =
    BankApplicationVariable.source.getValueOrThrow<string>(
      'BANK_ACCESS_TOKEN',
      String,
    );

  protected readonly _type = BankApplicationVariable.name;
}
