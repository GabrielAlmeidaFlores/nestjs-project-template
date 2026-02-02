import { InvalidInputError } from '@core/error/invalid-input.error';

export class FullOpinionGeneratorDoesNotContainSimplifiedAnalysisError extends InvalidInputError {
  protected override readonly _type =
    FullOpinionGeneratorDoesNotContainSimplifiedAnalysisError.name;

  public constructor() {
    super('A análise do gerador de parecer completo não contém uma análise simplificada.');
  }
}
