import { NotFoundError } from '@core/error/not-found.error';

export class CnisFastAnalysisNotFoundError extends NotFoundError {
  protected override readonly _type = CnisFastAnalysisNotFoundError.name;

  public constructor() {
    super('Análise rápida de CNIS não encontrada');
  }
}
