import { NotFoundError } from '@core/error/not-found.error';

export class RuralOrHybridRetirementRejectionResultNotFoundError extends NotFoundError {
  protected override readonly _type =
    RuralOrHybridRetirementRejectionResultNotFoundError.name;

  public constructor() {
    super('Resultado da análise de indeferimento de aposentadoria rural ou híbrida não encontrado.');
  }
}
