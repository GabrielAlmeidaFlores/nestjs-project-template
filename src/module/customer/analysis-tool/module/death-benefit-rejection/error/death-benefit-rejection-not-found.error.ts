import { NotFoundError } from '@core/error/not-found.error';

export class DeathBenefitRejectionNotFoundError extends NotFoundError {
  protected override readonly _type = DeathBenefitRejectionNotFoundError.name;

  public constructor() {
    super(
      'Análise de pensão por morte não encontrada. Por favor, verifique o ID informado.',
    );
  }
}
