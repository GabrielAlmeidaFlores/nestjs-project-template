import { InvalidInputError } from '@core/error/invalid-input.error';

export class PowerOfAttorneyGeneratorDoesNotContainCompleteAnalysisError extends InvalidInputError {
  protected override readonly _type = PowerOfAttorneyGeneratorDoesNotContainCompleteAnalysisError.name;

  public constructor() {
    super('A análise do gerador de procuração não contém uma análise completa.');
  }
}
