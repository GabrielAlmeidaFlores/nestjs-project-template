import { NotFoundError } from '@core/error/not-found.error';

export class DeathBenefitGrantPeriodNotFoundError extends NotFoundError {
  protected override readonly _type = DeathBenefitGrantPeriodNotFoundError.name;

  public constructor() {
    super('Período não encontrado. Por favor, verifique o ID informado.');
  }
}
