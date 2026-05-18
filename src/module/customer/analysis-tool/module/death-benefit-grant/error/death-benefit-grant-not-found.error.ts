import { NotFoundError } from '@core/error/not-found.error';

export class DeathBenefitGrantNotFoundError extends NotFoundError {
  protected override readonly _type = DeathBenefitGrantNotFoundError.name;

  public constructor() {
    super(
      'Análise de pensão por morte não encontrada. Por favor, verifique o ID informado.',
    );
  }
}
