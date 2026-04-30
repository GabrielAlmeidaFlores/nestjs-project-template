import { NotFoundError } from '@core/error/not-found.error';

export class RuralOrHybridRetirementAnalysisNotFoundError extends NotFoundError {
  protected override readonly _type =
    RuralOrHybridRetirementAnalysisNotFoundError.name;

  public constructor() {
    super(
      'Análise de indeferimento de aposentadoria rural ou híbrida não encontrada.',
    );
  }
}
