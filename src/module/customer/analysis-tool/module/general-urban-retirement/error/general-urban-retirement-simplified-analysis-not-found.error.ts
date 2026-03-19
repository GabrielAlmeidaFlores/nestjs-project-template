import { InvalidInputError } from '@core/error/invalid-input.error';

export class GeneralUrbanRetirementSimplifiedAnalysisNotFoundError extends InvalidInputError {
  protected override readonly _type =
    GeneralUrbanRetirementSimplifiedAnalysisNotFoundError.name;

  public constructor() {
    super(
      'A análise de aposentadoria urbana geral não contém análise simplificada disponível para download.',
    );
  }
}
