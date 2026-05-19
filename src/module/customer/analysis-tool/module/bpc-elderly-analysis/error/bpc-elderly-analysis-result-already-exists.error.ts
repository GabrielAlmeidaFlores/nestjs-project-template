import { InvalidInputError } from '@core/error/invalid-input.error';

export class BpcElderlyAnalysisResultAlreadyExistsError extends InvalidInputError {
  protected override readonly _type =
    BpcElderlyAnalysisResultAlreadyExistsError.name;

  public constructor() {
    super('Resultado da análise de BPC ao Idoso já existe.');
  }
}
