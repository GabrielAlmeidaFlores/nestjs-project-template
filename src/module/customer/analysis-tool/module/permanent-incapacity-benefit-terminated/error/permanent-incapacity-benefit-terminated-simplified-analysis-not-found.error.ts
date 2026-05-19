import { NotFoundError } from '@core/error/not-found.error';

export class PermanentIncapacityBenefitTerminatedSimplifiedAnalysisNotFoundError extends NotFoundError {
  protected override readonly _type =
    PermanentIncapacityBenefitTerminatedSimplifiedAnalysisNotFoundError.name;

  public constructor() {
    super('Análise simplificada não encontrada.');
  }
}
