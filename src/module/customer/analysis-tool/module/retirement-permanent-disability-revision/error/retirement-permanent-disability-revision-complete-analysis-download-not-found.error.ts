import { NotFoundError } from '@core/error/not-found.error';

export class RetirementPermanentDisabilityRevisionCompleteAnalysisDownloadNotFoundError extends NotFoundError {
  protected override readonly _type =
    RetirementPermanentDisabilityRevisionCompleteAnalysisDownloadNotFoundError.name;

  public constructor() {
    super(
      'Análise completa da revisão de aposentadoria por invalidez permanente não encontrada para download.',
    );
  }
}
