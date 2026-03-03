import { NotFoundError } from '@core/error/not-found.error';

export class RuralTimelineAnalysisPeriodResidenceNotFoundError extends NotFoundError {
  protected override readonly _type =
    RuralTimelineAnalysisPeriodResidenceNotFoundError.name;

  public constructor() {
    super('Residência do período não encontrada');
  }
}
