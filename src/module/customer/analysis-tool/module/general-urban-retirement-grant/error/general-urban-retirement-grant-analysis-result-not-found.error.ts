import { NotFoundError } from '@core/error/not-found.error';

export class GeneralUrbanRetirementGrantAnalysisResultNotFoundError extends NotFoundError {
  protected override readonly _type =
    GeneralUrbanRetirementGrantAnalysisResultNotFoundError.name;

  public constructor() {
    super(
      'Resultado da análise de concessão de aposentadoria urbana geral não encontrado',
    );
  }
}
