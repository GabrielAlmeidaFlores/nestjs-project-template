import { NotFoundError } from '@core/error/not-found.error';

export class RuralOrHybridRetirementRejectionPeriodNotFoundError extends NotFoundError {
  protected override readonly _type =
    RuralOrHybridRetirementRejectionPeriodNotFoundError.name;

  public constructor() {
    super(
      'Período da análise de indeferimento de aposentadoria rural ou híbrida não encontrado.',
    );
  }
}
