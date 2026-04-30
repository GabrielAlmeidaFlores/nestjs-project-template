import { InvalidInputError } from '@core/error/invalid-input.error';

export class UnsupportedRuralOrHybridRetirementAnalysisTimeAcceleratorTypeError extends InvalidInputError {
  protected override readonly _type =
    UnsupportedRuralOrHybridRetirementAnalysisTimeAcceleratorTypeError.name;

  public constructor() {
    super(
      'O tipo de acelerador de tempo de indeferimento de aposentadoria rural ou híbrida não é suportado.',
    );
  }
}
