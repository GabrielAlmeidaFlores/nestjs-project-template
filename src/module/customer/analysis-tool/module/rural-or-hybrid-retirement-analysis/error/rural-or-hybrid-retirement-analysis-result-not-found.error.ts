import { NotFoundError } from '@core/error/not-found.error';

export class RuralOrHybridRetirementAnalysisResultNotFoundError extends NotFoundError {
  protected override readonly _type =
    RuralOrHybridRetirementAnalysisResultNotFoundError.name;

  public constructor() {
    super(
      'Resultado da análise de indeferimento de aposentadoria rural ou híbrida não encontrado.',
    );
  }
}
