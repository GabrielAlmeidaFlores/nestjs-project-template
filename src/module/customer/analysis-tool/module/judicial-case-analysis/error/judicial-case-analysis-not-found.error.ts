import { NotFoundError } from '@core/error/not-found.error';

export class JudicialCaseAnalysisNotFoundError extends NotFoundError {
  protected override readonly _type = JudicialCaseAnalysisNotFoundError.name;

  public constructor() {
    super('Análise de caso judicial não encontrada');
  }
}
