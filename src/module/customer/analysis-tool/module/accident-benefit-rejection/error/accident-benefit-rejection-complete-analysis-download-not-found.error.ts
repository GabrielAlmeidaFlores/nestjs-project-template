import { NotFoundError } from '@core/error/not-found.error';

export class AccidentBenefitRejectionCompleteAnalysisDownloadNotFoundError extends NotFoundError {
  protected override readonly _type =
    AccidentBenefitRejectionCompleteAnalysisDownloadNotFoundError.name;

  public constructor() {
    super(
      'Download da análise completa de indeferimento de benefício acidentário não encontrado.',
    );
  }
}
