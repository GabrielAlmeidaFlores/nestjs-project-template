import { NotFoundError } from '@core/error/not-found.error';

export class DeathBenefitPeriodNotFoundError extends NotFoundError {
  protected override readonly _type = DeathBenefitPeriodNotFoundError.name;

  public constructor() {
    super('Período não encontrado. Por favor, verifique o ID informado.');
  }
}
