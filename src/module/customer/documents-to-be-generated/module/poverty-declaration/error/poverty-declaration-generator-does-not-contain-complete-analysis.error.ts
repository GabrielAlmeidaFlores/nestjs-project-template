import { InvalidInputError } from '@core/error/invalid-input.error';

export class PovertyDeclarationGeneratorDoesNotContainCompleteAnalysisError extends InvalidInputError {
  protected override readonly _type =
    PovertyDeclarationGeneratorDoesNotContainCompleteAnalysisError.name;

  public constructor() {
    super(
      'A análise do gerador de declaração de hipossuficiência não contém uma análise completa.',
    );
  }
}
