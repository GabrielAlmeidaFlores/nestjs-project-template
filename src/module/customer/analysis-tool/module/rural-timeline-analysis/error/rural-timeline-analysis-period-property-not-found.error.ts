import { NotFoundError } from '@core/error/not-found.error';

export class RuralTimelineAnalysisPeriodPropertyNotFoundError extends NotFoundError {
  protected override readonly _type =
    RuralTimelineAnalysisPeriodPropertyNotFoundError.name;

  public constructor() {
    super('Propriedade do período não encontrada');
  }
}
