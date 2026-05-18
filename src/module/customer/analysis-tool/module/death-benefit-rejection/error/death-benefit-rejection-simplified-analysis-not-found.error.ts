import { NotFoundError } from '@core/error/not-found.error';

export class DeathBenefitRejectionSimplifiedAnalysisNotFoundError extends NotFoundError {
  protected override readonly _type =
    DeathBenefitRejectionSimplifiedAnalysisNotFoundError.name;

  public constructor() {
    super(
      'Análise simplificada da pensão por morte não encontrada. Gere o resultado antes de fazer o download.',
    );
  }
}
