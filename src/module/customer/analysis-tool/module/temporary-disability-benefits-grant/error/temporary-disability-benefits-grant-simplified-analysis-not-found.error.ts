import { NotFoundError } from '@core/error/not-found.error';

export class TemporaryDisabilityBenefitsGrantSimplifiedAnalysisNotFoundError extends NotFoundError {
  protected override readonly _type =
    TemporaryDisabilityBenefitsGrantSimplifiedAnalysisNotFoundError.name;

  public constructor() {
    super(
      'Análise simplificada de concessão de benefício por incapacidade temporária não encontrada.',
    );
  }
}
