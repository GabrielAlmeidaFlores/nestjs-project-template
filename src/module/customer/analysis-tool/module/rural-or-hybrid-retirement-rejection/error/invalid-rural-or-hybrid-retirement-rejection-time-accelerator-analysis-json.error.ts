import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidRuralOrHybridRetirementRejectionTimeAcceleratorAnalysisJsonError extends InvalidInputError {
  protected override readonly _type =
    InvalidRuralOrHybridRetirementRejectionTimeAcceleratorAnalysisJsonError.name;

  public constructor() {
    super(
      'O JSON da análise de acelerador de tempo de indeferimento de aposentadoria rural ou híbrida é inválido.',
    );
  }
}
