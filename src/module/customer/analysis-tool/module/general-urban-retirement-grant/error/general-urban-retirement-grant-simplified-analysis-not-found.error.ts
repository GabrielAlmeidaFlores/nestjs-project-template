import { InvalidInputError } from '@core/error/invalid-input.error';

export class GeneralUrbanRetirementGrantSimplifiedAnalysisNotFoundError extends InvalidInputError {
  protected override readonly _type =
    GeneralUrbanRetirementGrantSimplifiedAnalysisNotFoundError.name;

  public constructor() {
    super(
      'A análise de concessão de aposentadoria urbana geral não contém análise simplificada disponível para download.',
    );
  }
}
