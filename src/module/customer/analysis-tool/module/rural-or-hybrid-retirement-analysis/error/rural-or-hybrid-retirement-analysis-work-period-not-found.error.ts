import { NotFoundError } from '@core/error/not-found.error';

export class RuralOrHybridRetirementAnalysisWorkPeriodNotFoundError extends NotFoundError {
  protected override readonly _type =
    RuralOrHybridRetirementAnalysisWorkPeriodNotFoundError.name;

  public constructor() {
    super(
      'Período de trabalho da análise de indeferimento de aposentadoria rural ou híbrida não encontrado.',
    );
  }
}
