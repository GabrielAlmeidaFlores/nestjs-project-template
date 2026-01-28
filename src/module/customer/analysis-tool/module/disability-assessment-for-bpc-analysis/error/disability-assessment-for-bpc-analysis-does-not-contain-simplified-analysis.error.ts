import { InvalidInputError } from '@core/error/invalid-input.error';

export class DisabilityAssessmentForBpcAnalysisDoesNotContainSimplifiedAnalysisError extends InvalidInputError {
  protected override readonly _type =
    DisabilityAssessmentForBpcAnalysisDoesNotContainSimplifiedAnalysisError.name;

  public constructor() {
    super(
      'A avaliação de deficiência para BPC não contém uma análise simplificada.',
    );
  }
}
