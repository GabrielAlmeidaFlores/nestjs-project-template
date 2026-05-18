import { NotFoundError } from '@core/error/not-found.error';

export class TemporaryDisabilityBenefitsGrantPeriodNotFoundError extends NotFoundError {
  protected override readonly _type =
    TemporaryDisabilityBenefitsGrantPeriodNotFoundError.name;

  public constructor() {
    super(
      'Período da análise de concessão de benefício por incapacidade temporária não encontrado.',
    );
  }
}
