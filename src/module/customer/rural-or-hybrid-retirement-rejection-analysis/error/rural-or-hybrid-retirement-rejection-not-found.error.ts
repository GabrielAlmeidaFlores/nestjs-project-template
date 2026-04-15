import { NotFoundError } from '@core/error/not-found.error';

export class RuralOrHybridRetirementRejectionNotFoundError extends NotFoundError {
  protected override readonly _type =
    RuralOrHybridRetirementRejectionNotFoundError.name;

  public constructor() {
    super(
      'Análise de rejeição de aposentadoria rural/híbrida não encontrada. Por favor, verifique o ID informado.',
    );
  }
}
