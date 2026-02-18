import { NotFoundError } from '@core/error/not-found.error';

export class RuralTimelineAnalysisCnisContributionPeriodUnderMinimumNotFoundError extends NotFoundError {
  protected override readonly _type =
    RuralTimelineAnalysisCnisContributionPeriodUnderMinimumNotFoundError.name;

  public constructor() {
    super('Período de contribuição CNIS abaixo do mínimo não encontrado');
  }
}
