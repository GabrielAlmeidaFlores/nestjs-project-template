import { NotFoundError } from '@core/error/not-found.error';

export class SpecialCategoryRetirementAnalysisRemunerationNotFoundError extends NotFoundError {
  protected override readonly _type =
    SpecialCategoryRetirementAnalysisRemunerationNotFoundError.name;

  public constructor() {
    super('Remuneração da análise de aposentadoria especial não encontrada.');
  }
}
