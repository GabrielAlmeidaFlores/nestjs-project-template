import { InvalidInputError } from '@core/error/invalid-input.error';

export class InsuranceQualityAnalysisDoesNotContainCompleteAnalysisError extends InvalidInputError {
  protected override readonly _type =
    InsuranceQualityAnalysisDoesNotContainCompleteAnalysisError.name;

  public constructor() {
    super(
      'A análise de qualidade de segurado não contém análise completa disponível para download.',
    );
  }
}
