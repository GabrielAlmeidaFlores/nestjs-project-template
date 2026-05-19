import { NotFoundError } from '@core/error/not-found.error';

export class SpecialCategoryRetirementAnalysisNotFoundError extends NotFoundError {
  protected override readonly _type =
    SpecialCategoryRetirementAnalysisNotFoundError.name;

  public constructor() {
    super('Análise de aposentadoria por categoria especial não encontrada.');
  }
}
