import { UnexpectedError } from '@core/error/unexpected.error';

export class FailedToGenerateGeneralUrbanRetirementReviewBenefitAwardLetterAnalysisError extends UnexpectedError {
  protected override readonly _type =
    FailedToGenerateGeneralUrbanRetirementReviewBenefitAwardLetterAnalysisError.name;

  public constructor() {
    super('Falha ao gerar a análise da carta de concessão da revisão.');
  }
}
