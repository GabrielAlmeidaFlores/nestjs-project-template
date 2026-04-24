import { NotFoundError } from '@core/error/not-found.error';

export class MaternityPayGrantCompleteAnalysisDownloadNotFoundError extends NotFoundError {
  protected override readonly _type =
    MaternityPayGrantCompleteAnalysisDownloadNotFoundError.name;

  public constructor() {
    super(
      'Download da análise completa do salário-maternidade não encontrado. Por favor, gere a análise antes de fazer o download.',
    );
  }
}
