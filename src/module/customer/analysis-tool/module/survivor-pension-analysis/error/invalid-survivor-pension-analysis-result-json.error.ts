import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidSurvivorPensionAnalysisResultJsonError extends InvalidInputError {
  protected override readonly _type =
    InvalidSurvivorPensionAnalysisResultJsonError.name;

  public constructor() {
    super('O JSON do resultado da análise de pensão por morte é inválido');
  }
}
