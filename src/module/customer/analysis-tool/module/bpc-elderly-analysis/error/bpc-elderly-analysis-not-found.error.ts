import { NotFoundError } from '@core/error/not-found.error';

export class BpcElderlyAnalysisNotFoundError extends NotFoundError {
  protected override readonly _type = BpcElderlyAnalysisNotFoundError.name;

  public constructor() {
    super('Análise de BPC ao Idoso não encontrada.');
  }
}
