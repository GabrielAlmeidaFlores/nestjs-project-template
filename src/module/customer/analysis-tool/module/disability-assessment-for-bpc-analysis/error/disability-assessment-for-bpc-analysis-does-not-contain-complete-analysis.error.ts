import { InvalidInputError } from '@core/error/invalid-input.error';

export class DisabilityAssessmentForBpcAnalysisDoesNotContainCompleteAnalysisError extends InvalidInputError {
  protected override readonly _type =
    DisabilityAssessmentForBpcAnalysisDoesNotContainCompleteAnalysisError.name;

  public constructor() {
    super(
      'A avaliação de deficiência para BPC não contém uma análise completa.',
    );
  }
}
