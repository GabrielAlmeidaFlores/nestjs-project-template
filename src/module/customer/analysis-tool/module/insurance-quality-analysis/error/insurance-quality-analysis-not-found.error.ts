import { NotFoundError } from '@core/error/not-found.error';

export class InsuranceQualityAnalysisNotFoundError extends NotFoundError {
  protected override readonly _type =
    InsuranceQualityAnalysisNotFoundError.name;

  public constructor() {
    super('Análise de qualidade de segurado não encontrada');
  }
}
