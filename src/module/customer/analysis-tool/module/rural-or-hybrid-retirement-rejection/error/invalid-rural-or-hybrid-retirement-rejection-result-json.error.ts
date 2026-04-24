import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidRuralOrHybridRetirementRejectionResultJsonError extends InvalidInputError {
  protected override readonly _type =
    InvalidRuralOrHybridRetirementRejectionResultJsonError.name;

  public constructor() {
    super(
      'O JSON do resultado da análise de indeferimento de aposentadoria rural ou híbrida é inválido.',
    );
  }
}
