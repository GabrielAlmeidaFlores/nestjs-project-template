import { NotFoundError } from '@core/error/not-found.error';

export class DeathBenefitGrantSimplifiedAnalysisNotFoundError extends NotFoundError {
  protected override readonly _type =
    DeathBenefitGrantSimplifiedAnalysisNotFoundError.name;

  public constructor() {
    super(
      'Análise simplificada da pensão por morte não encontrada. Gere o resultado antes de fazer o download.',
    );
  }
}
