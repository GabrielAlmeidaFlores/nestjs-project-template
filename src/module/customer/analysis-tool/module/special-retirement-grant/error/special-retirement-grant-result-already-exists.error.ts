import { InvalidInputError } from '@core/error/invalid-input.error';

export class SpecialRetirementGrantResultAlreadyExistsError extends InvalidInputError {
  protected override readonly _type =
    SpecialRetirementGrantResultAlreadyExistsError.name;

  public constructor() {
    super('Resultado da concessão de aposentadoria especial já existe');
  }
}
