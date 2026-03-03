import { NotFoundError } from '@core/error/not-found.error';

export class RuralTimelineAnalysisPeriodNotFoundError extends NotFoundError {
  protected override readonly _type =
    RuralTimelineAnalysisPeriodNotFoundError.name;

  public constructor() {
    super('Período da linha do tempo rural não encontrado');
  }
}
