import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidRuralOrHybridRetirementAnalysisTimeAcceleratorAnalysisJsonError extends InvalidInputError {
  protected override readonly _type =
    InvalidRuralOrHybridRetirementAnalysisTimeAcceleratorAnalysisJsonError.name;

  public constructor() {
    super(
      'O JSON da análise de acelerador de tempo de indeferimento de aposentadoria rural ou híbrida é inválido.',
    );
  }
}
