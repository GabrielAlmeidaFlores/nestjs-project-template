import { NotFoundError } from '@core/error/not-found.error';

export class GeneralUrbanRetirementReviewResultNotFoundError extends NotFoundError {
  protected override readonly _type =
    GeneralUrbanRetirementReviewResultNotFoundError.name;

  public constructor() {
    super(
      'Resultado da análise de revisão de aposentadoria urbana geral não encontrado',
    );
  }
}
