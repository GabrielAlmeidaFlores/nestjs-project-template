import { NotFoundError } from '@core/error/not-found.error';

export class GeneralUrbanRetirementReviewBenefitAwardLetterAnalysisNotFoundError extends NotFoundError {
  protected override readonly _type =
    GeneralUrbanRetirementReviewBenefitAwardLetterAnalysisNotFoundError.name;

  public constructor() {
    super(
      'Análise da carta de concessão da revisão não encontrada. Gere a análise da carta antes de solicitar a first analysis.',
    );
  }
}
