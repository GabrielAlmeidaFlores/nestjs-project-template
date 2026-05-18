import { NotFoundError } from '@core/error/not-found.error';

export class GeneralUrbanRetirementReviewAnalysisResultNotFoundError extends NotFoundError {
  protected override readonly _type =
    GeneralUrbanRetirementReviewAnalysisResultNotFoundError.name;

  public constructor() {
    super(
      'Resultado da análise de revisão de aposentadoria urbana geral não encontrado',
    );
  }
}
