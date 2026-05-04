import { UnexpectedError } from '@core/error/unexpected.error';

export class FailedToGenerateGeneralUrbanRetirementReviewFirstAnalysisError extends UnexpectedError {
  protected override readonly _type =
    FailedToGenerateGeneralUrbanRetirementReviewFirstAnalysisError.name;

  public constructor() {
    super('Falha ao gerar a first analysis da revisão.');
  }
}
