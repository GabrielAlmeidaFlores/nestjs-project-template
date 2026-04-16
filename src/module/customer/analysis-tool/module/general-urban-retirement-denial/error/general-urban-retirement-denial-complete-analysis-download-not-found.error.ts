import { NotFoundError } from '@core/error/not-found.error';

export class GeneralUrbanRetirementDenialCompleteAnalysisDownloadNotFoundError extends NotFoundError {
  protected override readonly _type =
    GeneralUrbanRetirementDenialCompleteAnalysisDownloadNotFoundError.name;

  public constructor() {
    super(
      'Download da análise completa de indeferimento de aposentadoria urbana comum não encontrado. É necessário gerar a análise completa antes de fazer o download.',
    );
  }
}
