import { InvalidInputError } from '@core/error/invalid-input.error';

export class CnisFastAnalysisResultAlreadyExistsError extends InvalidInputError {
  protected override readonly _type =
    CnisFastAnalysisResultAlreadyExistsError.name;

  public constructor() {
    super('Resultado da análise CNIS rápida já existe');
  }
}
