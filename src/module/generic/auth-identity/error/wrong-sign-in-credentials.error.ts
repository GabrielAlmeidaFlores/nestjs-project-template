import { InvalidInputError } from '@core/error/invalid-input.error';

export class WrongSignInCredentialsError extends InvalidInputError {
  protected override readonly _type = WrongSignInCredentialsError.name;

  public constructor() {
    super(
      'Credenciais inválidas. Por favor, verifique seus dados e tente novamente',
    );
  }
}
