import { NotFoundError } from '@core/error/not-found.error';

export class SpecialCategoryRetirementAnalysisWorkPeriodNotFoundError extends NotFoundError {
  protected override readonly _type =
    SpecialCategoryRetirementAnalysisWorkPeriodNotFoundError.name;

  public constructor() {
    super('Período de trabalho da análise de aposentadoria especial não encontrado.');
  }
}
