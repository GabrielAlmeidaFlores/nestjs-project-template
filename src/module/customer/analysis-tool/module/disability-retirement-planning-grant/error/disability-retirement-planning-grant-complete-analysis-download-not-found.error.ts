import { NotFoundError } from '@core/error/not-found.error';

export class DisabilityRetirementPlanningGrantCompleteAnalysisDownloadNotFoundError extends NotFoundError {
  protected override readonly _type =
    DisabilityRetirementPlanningGrantCompleteAnalysisDownloadNotFoundError.name;

  public constructor() {
    super(
      'Download da análise completa de concessão de aposentadoria para deficientes não encontrado. É necessário gerar a análise completa antes de fazer o download.',
    );
  }
}
