import { UnexpectedError } from '@core/error/unexpected.error';

export class InvalidGeneralUrbanRetirementDenialPppAnalysisJsonError extends UnexpectedError {
  protected override readonly _type =
    InvalidGeneralUrbanRetirementDenialPppAnalysisJsonError.name;

  public constructor() {
    super(
      'Falha ao processar a análise de PPP do indeferimento de aposentadoria urbana comum. JSON inválido ou incompleto.',
    );
  }
}
