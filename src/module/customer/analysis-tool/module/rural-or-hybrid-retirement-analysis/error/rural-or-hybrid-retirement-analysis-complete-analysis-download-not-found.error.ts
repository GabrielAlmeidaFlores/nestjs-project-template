import { NotFoundError } from '@core/error/not-found.error';

export class RuralOrHybridRetirementAnalysisCompleteAnalysisDownloadNotFoundError extends NotFoundError {
  protected override readonly _type =
    RuralOrHybridRetirementAnalysisCompleteAnalysisDownloadNotFoundError.name;

  public constructor() {
    super(
      'Download da análise completa de indeferimento de aposentadoria rural ou híbrida não encontrado.',
    );
  }
}
