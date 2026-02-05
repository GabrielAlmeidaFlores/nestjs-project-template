import { NotFoundError } from '@core/error/not-found.error';

export class RuralTimelineAnalysisCnisContributionPeriodNotFoundError extends NotFoundError {
  protected override readonly _type =
    RuralTimelineAnalysisCnisContributionPeriodNotFoundError.name;

  public constructor() {
    super('Período de contribuição CNIS não encontrado');
  }
}
