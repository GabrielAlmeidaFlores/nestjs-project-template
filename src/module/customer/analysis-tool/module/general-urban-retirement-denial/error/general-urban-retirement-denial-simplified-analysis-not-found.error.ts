import { NotFoundError } from '@core/error/not-found.error';

export class GeneralUrbanRetirementDenialSimplifiedAnalysisNotFoundError extends NotFoundError {
  protected override readonly _type =
    GeneralUrbanRetirementDenialSimplifiedAnalysisNotFoundError.name;

  public constructor() {
    super(
      'Análise simplificada de indeferimento de aposentadoria urbana comum não encontrada.',
    );
  }
}
