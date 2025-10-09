import { ForbiddenError } from '@core/error/forbidden.error';

export class WrongSignInCredentialsError extends ForbiddenError {
  protected override readonly _type = WrongSignInCredentialsError.name;

  public constructor() {
    super(
      'Credenciais inválidas. Por favor, verifique seus dados e tente novamente',
    );
  }
}
