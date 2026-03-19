import { InvalidInputError } from '@core/error/invalid-input.error';

export class GeneralUrbanRetirementGrantCompleteAnalysisNotFoundError extends InvalidInputError {
  protected override readonly _type =
    GeneralUrbanRetirementGrantCompleteAnalysisNotFoundError.name;

  public constructor() {
    super(
      'A análise de concessão de aposentadoria urbana geral não contém análise completa disponível para download.',
    );
  }
}
