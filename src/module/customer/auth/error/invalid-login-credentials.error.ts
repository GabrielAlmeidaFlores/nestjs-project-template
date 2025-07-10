import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidLoginCredentialsError extends InvalidInputError {
  protected override readonly _type = InvalidLoginCredentialsError.name;

  public constructor() {
    super('As credenciais de login informadas são inválidas');
  }
}
