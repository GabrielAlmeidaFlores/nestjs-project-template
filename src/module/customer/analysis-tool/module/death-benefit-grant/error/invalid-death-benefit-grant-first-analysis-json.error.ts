import { UnexpectedError } from '@core/error/unexpected.error';

export class InvalidDeathBenefitGrantFirstAnalysisJsonError extends UnexpectedError {
  protected override readonly _type =
    InvalidDeathBenefitGrantFirstAnalysisJsonError.name;

  public constructor() {
    super(
      'Falha ao processar a first analysis da concessão de pensão por morte. JSON inválido ou incompleto.',
    );
  }
}
