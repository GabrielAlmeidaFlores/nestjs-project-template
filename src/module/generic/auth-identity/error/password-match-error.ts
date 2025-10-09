import { InvalidInputError } from '@core/error/invalid-input.error';

export class PasswordMatchError extends InvalidInputError {
  protected override readonly _type = PasswordMatchError.name;

  public constructor() {
    super('As senhas informadas devem ser iguais');
  }
}
