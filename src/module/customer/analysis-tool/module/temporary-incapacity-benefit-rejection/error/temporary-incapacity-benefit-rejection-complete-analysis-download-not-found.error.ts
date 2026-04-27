import { NotFoundError } from '@core/error/not-found.error';

export class TemporaryIncapacityBenefitRejectionCompleteAnalysisDownloadNotFoundError extends NotFoundError {
  protected override readonly _type =
    TemporaryIncapacityBenefitRejectionCompleteAnalysisDownloadNotFoundError.name;

  public constructor() {
    super('Download da análise completa não encontrado.');
  }
}
