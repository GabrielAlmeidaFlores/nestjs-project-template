import { NotFoundError } from '@core/error/not-found.error';

export class PerCapitaIncomeForBpcAnalysisNotFoundError extends NotFoundError {
  protected override readonly _type =
    PerCapitaIncomeForBpcAnalysisNotFoundError.name;

  public constructor() {
    super('Análise de renda per capita para BPC não encontrada.');
  }
}
