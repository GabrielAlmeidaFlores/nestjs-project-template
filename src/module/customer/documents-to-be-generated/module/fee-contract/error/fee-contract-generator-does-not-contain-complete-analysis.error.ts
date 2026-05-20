import { InvalidInputError } from '@core/error/invalid-input.error';

export class FeeContractGeneratorDoesNotContainCompleteAnalysisError extends InvalidInputError {
  protected override readonly _type =
    FeeContractGeneratorDoesNotContainCompleteAnalysisError.name;

  public constructor() {
    super(
      'A análise do gerador de contrato de honorários não contém uma análise completa.',
    );
  }
}
