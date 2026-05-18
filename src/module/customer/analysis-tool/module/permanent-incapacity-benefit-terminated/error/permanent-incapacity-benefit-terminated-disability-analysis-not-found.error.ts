import { NotFoundError } from '@core/error/not-found.error';

export class PermanentIncapacityBenefitTerminatedDisabilityAnalysisNotFoundError extends NotFoundError {
  protected override readonly _type =
    PermanentIncapacityBenefitTerminatedDisabilityAnalysisNotFoundError.name;

  public constructor() {
    super('Análise da incapacidade não encontrada.');
  }
}
