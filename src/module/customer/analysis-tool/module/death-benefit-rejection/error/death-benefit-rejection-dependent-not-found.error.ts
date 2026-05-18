import { NotFoundError } from '@core/error/not-found.error';

export class DeathBenefitRejectionDependentNotFoundError extends NotFoundError {
  protected override readonly _type =
    DeathBenefitRejectionDependentNotFoundError.name;

  public constructor() {
    super(
      'Dependente da análise de pensão por morte não encontrado. Por favor, verifique o ID informado.',
    );
  }
}
