import { NotFoundError } from '@core/error/not-found.error';

export class SpecialCategoryRetirementAnalysisPeriodDocumentNotFoundError extends NotFoundError {
  protected override readonly _type =
    SpecialCategoryRetirementAnalysisPeriodDocumentNotFoundError.name;

  public constructor() {
    super('Documento do período de aposentadoria especial não encontrado.');
  }
}
