import { NotFoundError } from '@core/error/not-found.error';

export class GeneralUrbanRetirementGrantSpecialPeriodNotFoundError extends NotFoundError {
  protected override readonly _type =
    GeneralUrbanRetirementGrantSpecialPeriodNotFoundError.name;

  public constructor() {
    super(
      'Período especial da análise de concessão de aposentadoria urbana geral não encontrado',
    );
  }
}
