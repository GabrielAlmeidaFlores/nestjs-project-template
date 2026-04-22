import { NotFoundError } from '@core/error/not-found.error';

export class DeathBenefitRejectionResultNotFoundError extends NotFoundError {
  protected override readonly _type =
    DeathBenefitRejectionResultNotFoundError.name;

  public constructor() {
    super(
      'Resultado da análise de pensão por morte não encontrado. Execute a primeira análise antes de gerar o resultado.',
    );
  }
}
