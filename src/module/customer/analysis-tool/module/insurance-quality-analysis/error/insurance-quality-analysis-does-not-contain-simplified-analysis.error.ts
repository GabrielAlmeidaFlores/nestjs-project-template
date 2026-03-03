import { InvalidInputError } from '@core/error/invalid-input.error';

export class InsuranceQualityAnalysisDoesNotContainSimplifiedAnalysisError extends InvalidInputError {
  protected override readonly _type =
    InsuranceQualityAnalysisDoesNotContainSimplifiedAnalysisError.name;

  public constructor() {
    super(
      'A análise de qualidade de segurado não contém análise simplificada disponível para download.',
    );
  }
}
