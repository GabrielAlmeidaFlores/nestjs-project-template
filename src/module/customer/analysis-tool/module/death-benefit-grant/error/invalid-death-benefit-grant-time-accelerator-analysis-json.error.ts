import { UnexpectedError } from '@core/error/unexpected.error';

export class InvalidDeathBenefitGrantTimeAcceleratorAnalysisJsonError extends UnexpectedError {
  protected override readonly _type =
    InvalidDeathBenefitGrantTimeAcceleratorAnalysisJsonError.name;

  public constructor() {
    super(
      'Falha ao processar a análise de acelerador de tempo da pensão por morte. JSON inválido ou incompleto.',
    );
  }
}
