import { InvalidInputError } from '@core/error/invalid-input.error';

export class NewPasswordMatchesCurrentError extends InvalidInputError {
  protected override readonly _type = NewPasswordMatchesCurrentError.name;

  public constructor() {
    super('A nova senha não pode ser a mesma que a antiga');
  }
}
