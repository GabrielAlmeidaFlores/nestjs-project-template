import { UnexpectedError } from '@core/error/unexpected.error';

export class InvalidAnalysisResultError extends UnexpectedError {
  protected override readonly _type = InvalidAnalysisResultError.name;

  public constructor() {
    super('Resultado da análise de IA é inválido ou não pode ser processado.');
  }
}
