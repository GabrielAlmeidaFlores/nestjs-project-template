import { NotFoundError } from '@core/error/not-found.error';

export class PermanentIncapacityBenefitTerminatedCompleteAnalysisDownloadNotFoundError extends NotFoundError {
  protected override readonly _type =
    PermanentIncapacityBenefitTerminatedCompleteAnalysisDownloadNotFoundError.name;

  public constructor() {
    super('Download da análise completa não encontrado.');
  }
}
