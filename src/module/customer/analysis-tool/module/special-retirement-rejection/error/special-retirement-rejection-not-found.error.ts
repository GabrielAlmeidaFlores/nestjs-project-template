import { NotFoundError } from '@core/error/not-found.error';

export class SpecialRetirementRejectionNotFoundError extends NotFoundError {
  protected override readonly _type =
    SpecialRetirementRejectionNotFoundError.name;

  public constructor() {
    super('Análise de indeferimento de aposentadoria especial não encontrada.');
  }
}
