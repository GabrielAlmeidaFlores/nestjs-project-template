import { NotFoundError } from '@core/error/not-found.error';

export class GeneralUrbanRetirementReviewSpecialPeriodNotFoundError extends NotFoundError {
  protected override readonly _type =
    GeneralUrbanRetirementReviewSpecialPeriodNotFoundError.name;

  public constructor() {
    super(
      'Período especial da análise de revisão de aposentadoria urbana geral não encontrado',
    );
  }
}
