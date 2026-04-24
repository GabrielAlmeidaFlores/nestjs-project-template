import { NotFoundError } from '@core/error/not-found.error';

export class RuralOrHybridRetirementRejectionTimeAcceleratorNotFoundError extends NotFoundError {
  protected override readonly _type =
    RuralOrHybridRetirementRejectionTimeAcceleratorNotFoundError.name;

  public constructor() {
    super(
      'Acelerador de tempo da análise de indeferimento de aposentadoria rural ou híbrida não encontrado.',
    );
  }
}
