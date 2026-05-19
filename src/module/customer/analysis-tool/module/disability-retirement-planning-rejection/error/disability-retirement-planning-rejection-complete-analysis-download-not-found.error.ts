import { NotFoundError } from '@core/error/not-found.error';

export class DisabilityRetirementPlanningRejectionCompleteAnalysisDownloadNotFoundError extends NotFoundError {
  protected override readonly _type =
    DisabilityRetirementPlanningRejectionCompleteAnalysisDownloadNotFoundError.name;

  public constructor() {
    super(
      'Download da análise completa de indeferimento de aposentadoria da pessoa com deficiência não encontrado. Por favor, gere a análise completa antes de realizar o download.',
    );
  }
}
