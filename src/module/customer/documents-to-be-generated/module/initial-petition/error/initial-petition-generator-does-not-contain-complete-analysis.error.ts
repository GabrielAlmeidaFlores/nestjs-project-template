import { InvalidInputError } from '@core/error/invalid-input.error';

export class InitialPetitionGeneratorDoesNotContainCompleteAnalysisError extends InvalidInputError {
  protected override readonly _type =
    InitialPetitionGeneratorDoesNotContainCompleteAnalysisError.name;

  public constructor() {
    super(
      'A análise do gerador de petição inicial não contém uma análise completa.',
    );
  }
}
