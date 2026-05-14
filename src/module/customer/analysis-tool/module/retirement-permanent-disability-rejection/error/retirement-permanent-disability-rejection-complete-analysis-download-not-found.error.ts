import { NotFoundError } from '@core/error/not-found.error';

export class RetirementPermanentDisabilityRejectionCompleteAnalysisDownloadNotFoundError extends NotFoundError {
  protected override readonly _type =
    RetirementPermanentDisabilityRejectionCompleteAnalysisDownloadNotFoundError.name;

  public constructor() {
    super(
      'O download da análise completa de indeferimento por incapacidade permanente não foi encontrado.',
    );
  }
}
