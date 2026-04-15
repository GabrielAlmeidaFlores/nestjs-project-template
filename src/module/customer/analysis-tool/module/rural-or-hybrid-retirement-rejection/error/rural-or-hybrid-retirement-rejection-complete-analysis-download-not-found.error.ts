import { NotFoundError } from '@core/error/not-found.error';

export class RuralOrHybridRetirementRejectionCompleteAnalysisDownloadNotFoundError extends NotFoundError {
  protected override readonly _type =
    RuralOrHybridRetirementRejectionCompleteAnalysisDownloadNotFoundError.name;

  public constructor() {
    super(
      'Download da análise completa de indeferimento de aposentadoria rural ou híbrida não encontrado.',
    );
  }
}
