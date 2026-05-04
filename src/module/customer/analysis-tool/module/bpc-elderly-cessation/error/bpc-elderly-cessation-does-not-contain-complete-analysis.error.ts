import { InvalidInputError } from '@core/error/invalid-input.error';

export class BpcElderlyCessationDoesNotContainCompleteAnalysisError extends InvalidInputError {
  protected override readonly _type =
    BpcElderlyCessationDoesNotContainCompleteAnalysisError.name;

  public constructor() {
    super('A análise de cessação de BPC ao Idoso não contém análise completa.');
  }
}
