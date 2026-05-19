import { UnexpectedError } from '@core/error/unexpected.error';

export class InvalidGeneralUrbanRetirementDenialFirstAnalysisJsonError extends UnexpectedError {
  protected override readonly _type =
    InvalidGeneralUrbanRetirementDenialFirstAnalysisJsonError.name;

  public constructor() {
    super(
      'Falha ao processar a first analysis do indeferimento de aposentadoria urbana comum. JSON inválido ou incompleto.',
    );
  }
}
