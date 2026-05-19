import { InvalidInputError } from '@core/error/invalid-input.error';

export class GeneralUrbanRetirementCompleteAnalysisNotFoundError extends InvalidInputError {
  protected override readonly _type =
    GeneralUrbanRetirementCompleteAnalysisNotFoundError.name;

  public constructor() {
    super(
      'A análise de aposentadoria urbana geral não contém análise completa disponível para download.',
    );
  }
}
