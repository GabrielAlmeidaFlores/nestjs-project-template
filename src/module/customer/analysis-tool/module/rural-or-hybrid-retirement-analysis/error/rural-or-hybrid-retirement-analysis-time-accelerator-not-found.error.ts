import { NotFoundError } from '@core/error/not-found.error';

export class RuralOrHybridRetirementAnalysisTimeAcceleratorNotFoundError extends NotFoundError {
  protected override readonly _type =
    RuralOrHybridRetirementAnalysisTimeAcceleratorNotFoundError.name;

  public constructor() {
    super(
      'Acelerador de tempo da análise de indeferimento de aposentadoria rural ou híbrida não encontrado.',
    );
  }
}
