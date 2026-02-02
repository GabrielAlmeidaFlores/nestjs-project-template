import { InvalidInputError } from '@core/error/invalid-input.error';

export class FullOpinionGeneratorDoesNotContainCompleteAnalysisError extends InvalidInputError {
  protected override readonly _type =
    FullOpinionGeneratorDoesNotContainCompleteAnalysisError.name;

  public constructor() {
    super('A análise do gerador de parecer completo não contém uma análise completa.');
  }
}
