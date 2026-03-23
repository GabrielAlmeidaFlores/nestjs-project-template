import { NotFoundError } from '@core/error/not-found.error';

export class AnalysisToolRecordNotFoundError extends NotFoundError {
  protected override readonly _type = AnalysisToolRecordNotFoundError.name;

  public constructor() {
    super('Análise não encontrada');
  }
}
