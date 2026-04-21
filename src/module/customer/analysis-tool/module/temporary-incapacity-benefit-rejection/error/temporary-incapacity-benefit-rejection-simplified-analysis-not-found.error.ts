import { NotFoundError } from '@core/error/not-found.error';

export class TemporaryIncapacityBenefitRejectionSimplifiedAnalysisNotFoundError extends NotFoundError {
  protected override readonly _type =
    TemporaryIncapacityBenefitRejectionSimplifiedAnalysisNotFoundError.name;

  public constructor() {
    super('Análise simplificada não encontrada.');
  }
}
