import { UnexpectedError } from '@core/error/unexpected.error';

export class InvalidDeathBenefitRejectionTimeAcceleratorAnalysisJsonError extends UnexpectedError {
  protected override readonly _type =
    InvalidDeathBenefitRejectionTimeAcceleratorAnalysisJsonError.name;

  public constructor() {
    super(
      'Falha ao processar a análise de acelerador de tempo da pensão por morte. JSON inválido ou incompleto.',
    );
  }
}
