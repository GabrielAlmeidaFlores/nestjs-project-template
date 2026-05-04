import { NotFoundError } from '@core/error/not-found.error';

export class TemporaryDisabilityBenefitsTerminatedCompleteAnalysisDownloadNotFoundError extends NotFoundError {
  protected override readonly _type =
    TemporaryDisabilityBenefitsTerminatedCompleteAnalysisDownloadNotFoundError.name;

  public constructor() {
    super('Download da análise completa não encontrado.');
  }
}
