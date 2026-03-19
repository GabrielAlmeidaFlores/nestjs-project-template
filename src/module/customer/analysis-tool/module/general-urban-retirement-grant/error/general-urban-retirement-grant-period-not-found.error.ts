import { NotFoundError } from '@core/error/not-found.error';

export class GeneralUrbanRetirementGrantPeriodNotFoundError extends NotFoundError {
  protected override readonly _type =
    GeneralUrbanRetirementGrantPeriodNotFoundError.name;

  public constructor() {
    super(
      'Período da análise de concessão de aposentadoria urbana geral não encontrado',
    );
  }
}
