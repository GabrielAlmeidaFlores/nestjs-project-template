import { NotFoundError } from '@core/error/not-found.error';

export class GeneralUrbanRetirementReviewNotFoundError extends NotFoundError {
  protected override readonly _type =
    GeneralUrbanRetirementReviewNotFoundError.name;

  public constructor() {
    super('Análise de revisão de aposentadoria urbana geral não encontrada');
  }
}
