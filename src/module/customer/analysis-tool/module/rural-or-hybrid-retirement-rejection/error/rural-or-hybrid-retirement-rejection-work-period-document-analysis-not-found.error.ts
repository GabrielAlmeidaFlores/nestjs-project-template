import { NotFoundError } from '@core/error/not-found.error';

export class RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisNotFoundError extends NotFoundError {
  protected override readonly _type =
    RuralOrHybridRetirementRejectionWorkPeriodDocumentAnalysisNotFoundError.name;

  public constructor() {
    super(
      'Análise de documento do período de trabalho da análise de indeferimento de aposentadoria rural ou híbrida não encontrada.',
    );
  }
}
