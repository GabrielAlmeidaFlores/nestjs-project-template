import { NotFoundError } from '@core/error/not-found.error';

export class DeathBenefitGrantCompleteAnalysisDownloadNotFoundError extends NotFoundError {
  protected override readonly _type =
    DeathBenefitGrantCompleteAnalysisDownloadNotFoundError.name;

  public constructor() {
    super(
      'Análise completa da pensão por morte não encontrada. Gere o resultado antes de fazer o download.',
    );
  }
}
