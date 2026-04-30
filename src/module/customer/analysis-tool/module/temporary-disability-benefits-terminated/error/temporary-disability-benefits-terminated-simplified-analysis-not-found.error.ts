import { NotFoundError } from '@core/error/not-found.error';

export class TemporaryDisabilityBenefitsTerminatedSimplifiedAnalysisNotFoundError extends NotFoundError {
  protected override readonly _type =
    TemporaryDisabilityBenefitsTerminatedSimplifiedAnalysisNotFoundError.name;

  public constructor() {
    super('Análise simplificada não encontrada.');
  }
}
