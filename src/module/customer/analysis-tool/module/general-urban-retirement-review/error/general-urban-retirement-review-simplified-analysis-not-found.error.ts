import { InvalidInputError } from '@core/error/invalid-input.error';

export class GeneralUrbanRetirementReviewSimplifiedAnalysisNotFoundError extends InvalidInputError {
  protected override readonly _type =
    GeneralUrbanRetirementReviewSimplifiedAnalysisNotFoundError.name;

  public constructor() {
    super(
      'A análise de revisão de aposentadoria urbana geral não contém análise simplificada disponível para download.',
    );
  }
}
