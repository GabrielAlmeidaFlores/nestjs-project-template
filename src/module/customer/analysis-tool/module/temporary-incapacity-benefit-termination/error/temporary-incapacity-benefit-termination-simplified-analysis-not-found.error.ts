import { NotFoundError } from '@core/error/not-found.error';

export class TemporaryIncapacityBenefitTerminationSimplifiedAnalysisNotFoundError extends NotFoundError {
  protected override readonly _type =
    TemporaryIncapacityBenefitTerminationSimplifiedAnalysisNotFoundError.name;

  public constructor() {
    super('Análise simplificada não encontrada.');
  }
}
