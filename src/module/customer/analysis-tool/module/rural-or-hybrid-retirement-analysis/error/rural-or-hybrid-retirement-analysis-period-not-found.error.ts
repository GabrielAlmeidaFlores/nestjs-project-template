import { NotFoundError } from '@core/error/not-found.error';

export class RuralOrHybridRetirementAnalysisPeriodNotFoundError extends NotFoundError {
  protected override readonly _type =
    RuralOrHybridRetirementAnalysisPeriodNotFoundError.name;

  public constructor() {
    super(
      'Período da análise de indeferimento de aposentadoria rural ou híbrida não encontrado.',
    );
  }
}
