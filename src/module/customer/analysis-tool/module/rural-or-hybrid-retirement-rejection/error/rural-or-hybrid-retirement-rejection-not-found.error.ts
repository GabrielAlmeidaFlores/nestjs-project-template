import { NotFoundError } from '@core/error/not-found.error';

export class RuralOrHybridRetirementRejectionNotFoundError extends NotFoundError {
  protected override readonly _type =
    RuralOrHybridRetirementRejectionNotFoundError.name;

  public constructor() {
    super('Análise de indeferimento de aposentadoria rural ou híbrida não encontrada.');
  }
}
