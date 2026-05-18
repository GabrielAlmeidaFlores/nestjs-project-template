import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidRuralOrHybridRetirementAnalysisResultJsonError extends InvalidInputError {
  protected override readonly _type =
    InvalidRuralOrHybridRetirementAnalysisResultJsonError.name;

  public constructor() {
    super(
      'O JSON do resultado da análise de indeferimento de aposentadoria rural ou híbrida é inválido.',
    );
  }
}
