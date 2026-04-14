import { UnexpectedError } from '@core/error/unexpected.error';

export class InvalidDeathBenefitGrantResultJsonError extends UnexpectedError {
  protected override readonly _type =
    InvalidDeathBenefitGrantResultJsonError.name;

  public constructor() {
    super(
      'Falha ao processar o resultado da análise de pensão por morte. JSON inválido ou incompleto.',
    );
  }
}
