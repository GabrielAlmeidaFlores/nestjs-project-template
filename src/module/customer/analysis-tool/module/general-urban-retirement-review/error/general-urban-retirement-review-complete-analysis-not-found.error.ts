import { InvalidInputError } from '@core/error/invalid-input.error';

export class GeneralUrbanRetirementReviewCompleteAnalysisNotFoundError extends InvalidInputError {
  protected override readonly _type =
    GeneralUrbanRetirementReviewCompleteAnalysisNotFoundError.name;

  public constructor() {
    super(
      'A análise de revisão de aposentadoria urbana geral não contém análise completa disponível para download.',
    );
  }
}
