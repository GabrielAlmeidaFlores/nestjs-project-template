import { NotFoundError } from '@core/error/not-found.error';

export class MaternityPayRejectionCompleteAnalysisDownloadNotFoundError extends NotFoundError {
  protected override readonly _type =
    MaternityPayRejectionCompleteAnalysisDownloadNotFoundError.name;

  public constructor() {
    super(
      'Download da análise completa de indeferimento de salário maternidade não encontrado.',
    );
  }
}
