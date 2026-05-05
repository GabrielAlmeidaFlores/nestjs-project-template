import { InvalidInputError } from '@core/error/invalid-input.error';

export class BpcElderlyCessationDoesNotContainSimplifiedAnalysisError extends InvalidInputError {
  protected override readonly _type =
    BpcElderlyCessationDoesNotContainSimplifiedAnalysisError.name;

  public constructor() {
    super(
      'A análise de cessação de BPC ao Idoso não contém análise simplificada.',
    );
  }
}
