import { NotFoundError } from '@core/error/not-found.error';

export class SpecialRetirementGrantNotFoundError extends NotFoundError {
  protected override readonly _type = SpecialRetirementGrantNotFoundError.name;

  public constructor() {
    super('Concessão de aposentadoria especial não encontrada');
  }
}
