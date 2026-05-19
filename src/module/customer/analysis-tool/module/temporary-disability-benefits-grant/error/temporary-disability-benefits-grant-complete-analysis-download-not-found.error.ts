import { NotFoundError } from '@core/error/not-found.error';

export class TemporaryDisabilityBenefitsGrantCompleteAnalysisDownloadNotFoundError extends NotFoundError {
  protected override readonly _type =
    TemporaryDisabilityBenefitsGrantCompleteAnalysisDownloadNotFoundError.name;

  public constructor() {
    super(
      'Download da análise completa de concessão de benefício por incapacidade temporária não encontrado.',
    );
  }
}
