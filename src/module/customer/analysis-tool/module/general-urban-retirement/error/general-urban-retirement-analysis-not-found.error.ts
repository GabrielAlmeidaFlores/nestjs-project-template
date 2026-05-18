import { NotFoundError } from '@core/error/not-found.error';

export class GeneralUrbanRetirementAnalysisNotFoundError extends NotFoundError {
  protected override readonly _type =
    GeneralUrbanRetirementAnalysisNotFoundError.name;

  public constructor() {
    super('Análise de aposentadoria urbana geral não encontrada');
  }
}
