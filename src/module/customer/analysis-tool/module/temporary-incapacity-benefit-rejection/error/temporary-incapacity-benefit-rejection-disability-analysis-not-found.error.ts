import { NotFoundError } from '@core/error/not-found.error';

export class TemporaryIncapacityBenefitRejectionDisabilityAnalysisNotFoundError extends NotFoundError {
  protected override readonly _type =
    TemporaryIncapacityBenefitRejectionDisabilityAnalysisNotFoundError.name;

  public constructor() {
    super('Análise da incapacidade não encontrada.');
  }
}
