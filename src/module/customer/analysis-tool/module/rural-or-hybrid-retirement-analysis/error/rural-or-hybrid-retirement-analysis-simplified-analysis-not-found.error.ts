import { NotFoundError } from '@core/error/not-found.error';

export class RuralOrHybridRetirementAnalysisSimplifiedAnalysisNotFoundError extends NotFoundError {
  protected override readonly _type =
    RuralOrHybridRetirementAnalysisSimplifiedAnalysisNotFoundError.name;

  public constructor() {
    super(
      'Download da análise simplificada de indeferimento de aposentadoria rural ou híbrida não encontrado.',
    );
  }
}
