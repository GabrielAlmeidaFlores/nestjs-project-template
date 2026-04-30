import { NotFoundError } from '@core/error/not-found.error';

export class TemporaryIncapacityBenefitTerminationCompleteAnalysisDownloadNotFoundError extends NotFoundError {
  protected override readonly _type =
    TemporaryIncapacityBenefitTerminationCompleteAnalysisDownloadNotFoundError.name;

  public constructor() {
    super('Download da análise completa não encontrado.');
  }
}
