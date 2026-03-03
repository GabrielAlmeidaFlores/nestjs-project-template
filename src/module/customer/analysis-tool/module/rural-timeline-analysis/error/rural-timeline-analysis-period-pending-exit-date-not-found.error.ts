import { NotFoundError } from '@core/error/not-found.error';

export class RuralTimelineAnalysisPeriodPendingExitDateNotFoundError extends NotFoundError {
  protected override readonly _type =
    RuralTimelineAnalysisPeriodPendingExitDateNotFoundError.name;

  public constructor() {
    super('Pendência sem data de saída não encontrada');
  }
}
