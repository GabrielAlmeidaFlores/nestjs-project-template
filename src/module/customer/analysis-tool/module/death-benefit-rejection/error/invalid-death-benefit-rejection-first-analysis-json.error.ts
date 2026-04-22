import { UnexpectedError } from '@core/error/unexpected.error';

export class InvalidDeathBenefitRejectionFirstAnalysisJsonError extends UnexpectedError {
  protected override readonly _type =
    InvalidDeathBenefitRejectionFirstAnalysisJsonError.name;

  public constructor() {
    super(
      'Falha ao processar a first analysis do indeferimento de pensão por morte. JSON inválido ou incompleto.',
    );
  }
}
