import { NotFoundError } from '@core/error/not-found.error';

export class DeathBenefitRejectionCompleteAnalysisDownloadNotFoundError extends NotFoundError {
  protected override readonly _type =
    DeathBenefitRejectionCompleteAnalysisDownloadNotFoundError.name;

  public constructor() {
    super(
      'Análise completa da pensão por morte não encontrada. Gere o resultado antes de fazer o download.',
    );
  }
}
