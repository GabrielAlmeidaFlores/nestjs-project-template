import { NotFoundError } from '@core/error/not-found.error';

export class GeneralUrbanRetirementReviewPeriodNotFoundError extends NotFoundError {
  protected override readonly _type =
    GeneralUrbanRetirementReviewPeriodNotFoundError.name;

  public constructor() {
    super(
      'Período da análise de revisão de aposentadoria urbana geral não encontrado',
    );
  }
}
