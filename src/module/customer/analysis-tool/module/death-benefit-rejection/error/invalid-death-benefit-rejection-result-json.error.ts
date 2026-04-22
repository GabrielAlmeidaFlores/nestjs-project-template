import { UnexpectedError } from '@core/error/unexpected.error';

export class InvalidDeathBenefitRejectionResultJsonError extends UnexpectedError {
  protected override readonly _type =
    InvalidDeathBenefitRejectionResultJsonError.name;

  public constructor() {
    super(
      'Falha ao processar o resultado da análise de pensão por morte. JSON inválido ou incompleto.',
    );
  }
}
