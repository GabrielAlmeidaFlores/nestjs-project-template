import { NotFoundError } from '@core/error/not-found.error';

export class SpecialCategoryRetirementAnalysisResultNotFoundError extends NotFoundError {
  protected override readonly _type =
    SpecialCategoryRetirementAnalysisResultNotFoundError.name;

  public constructor() {
    super(
      'Resultado da análise de aposentadoria por categoria especial não encontrado.',
    );
  }
}
