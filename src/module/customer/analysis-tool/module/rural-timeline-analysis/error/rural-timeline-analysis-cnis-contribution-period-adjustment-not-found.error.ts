import { NotFoundError } from '@core/error/not-found.error';

export class RuralTimelineAnalysisCnisContributionPeriodAdjustmentNotFoundError extends NotFoundError {
  protected override readonly _type =
    RuralTimelineAnalysisCnisContributionPeriodAdjustmentNotFoundError.name;

  public constructor() {
    super('Ajuste do período de contribuição CNIS não encontrado.');
  }
}
