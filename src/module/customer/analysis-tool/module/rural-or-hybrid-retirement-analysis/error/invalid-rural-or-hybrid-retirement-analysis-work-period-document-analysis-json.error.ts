import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidRuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisJsonError extends InvalidInputError {
  protected override readonly _type =
    InvalidRuralOrHybridRetirementAnalysisWorkPeriodDocumentAnalysisJsonError.name;

  public constructor() {
    super(
      'O JSON da análise de documentos do período de trabalho de indeferimento de aposentadoria rural ou híbrida é inválido.',
    );
  }
}
