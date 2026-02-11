import { InvalidInputError } from '@core/error/invalid-input.error';

export class InitialPetitionGeneratorDoesNotContainSimplifiedAnalysisError extends InvalidInputError {
  protected override readonly _type =
    InitialPetitionGeneratorDoesNotContainSimplifiedAnalysisError.name;

  public constructor() {
    super(
      'A análise do gerador de petição inicial não contém uma análise simplificada.',
    );
  }
}
