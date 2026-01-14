import { EnvironmentVariableService } from '@shared/system/constant/application-variable/implementation/environment-variable/environment-variable.service';

export class LegalProceedingConsumerApplicationVariable {
  public static readonly source = new EnvironmentVariableService();

  public static readonly defaultComunicacaoPjeApiUrl =
    'https://comunicaapi.pje.jus.br/api/v1/comunicacao';

  public static readonly LEGAL_PROCEEDING_CONSUMER_COMUNICACAO_PJE_API_URL =
    LegalProceedingConsumerApplicationVariable.source.getValueOrDefault<string>(
      'LEGAL_PROCEEDING_CONSUMER_COMUNICACAO_PJE_API_URL',
      String,
      LegalProceedingConsumerApplicationVariable.defaultComunicacaoPjeApiUrl,
    );

  protected readonly _type = LegalProceedingConsumerApplicationVariable.name;
}
