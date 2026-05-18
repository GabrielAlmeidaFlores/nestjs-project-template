import { NotFoundError } from '@core/error/not-found.error';

export class DeathBenefitRejectionPeriodNotFoundError extends NotFoundError {
  protected override readonly _type =
    DeathBenefitRejectionPeriodNotFoundError.name;

  public constructor() {
    super('Período não encontrado. Por favor, verifique o ID informado.');
  }
}
