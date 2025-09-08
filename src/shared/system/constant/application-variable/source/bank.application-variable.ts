import { EnvironmentVariableService } from '@shared/system/constant/application-variable/implementation/environment-variable/environment-variable.service';

export class BankApplicationVariable {
  public static readonly source = new EnvironmentVariableService();

  public static readonly BANK_URL =
    BankApplicationVariable.source.getValueOrThrow<string>('BANK_URL', String);

  public static readonly BANK_ACCESS_TOKEN =
    BankApplicationVariable.source.getValueOrThrow<string>(
      'BANK_ACCESS_TOKEN',
      String,
    );

  protected readonly _type = BankApplicationVariable.name;
}
