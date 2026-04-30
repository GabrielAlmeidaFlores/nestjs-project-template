import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidRuralOrHybridRetirementAnalysisFirstAnalysisJsonError extends InvalidInputError {
  protected override readonly _type =
    InvalidRuralOrHybridRetirementAnalysisFirstAnalysisJsonError.name;

  public constructor() {
    super(
      'O JSON da primeira análise de indeferimento de aposentadoria rural ou híbrida é inválido.',
    );
  }
}
