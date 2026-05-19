import { NotFoundError } from '@core/error/not-found.error';

export class RuralOrHybridRetirementRejectionWorkPeriodNotFoundError extends NotFoundError {
  protected override readonly _type =
    RuralOrHybridRetirementRejectionWorkPeriodNotFoundError.name;

  public constructor() {
    super(
      'Período de trabalho da análise de indeferimento de aposentadoria rural ou híbrida não encontrado.',
    );
  }
}
