import { NotFoundError } from '@core/error/not-found.error';

export class RuralTimelineAnalysisPeriodEconomicAspectsNotFoundError extends NotFoundError {
  protected override readonly _type =
    RuralTimelineAnalysisPeriodEconomicAspectsNotFoundError.name;

  public constructor() {
    super('Aspectos econômicos do período não encontrados');
  }
}
