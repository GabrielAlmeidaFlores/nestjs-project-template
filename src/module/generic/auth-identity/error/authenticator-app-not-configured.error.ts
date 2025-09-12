import { InvalidInputError } from '@core/error/invalid-input.error';

export class AuthenticatorAppNotConfiguredError extends InvalidInputError {
  protected override readonly _type = AuthenticatorAppNotConfiguredError.name;

  public constructor() {
    super(
      'O aplicativo autenticador ainda não foi configurado para esta conta',
    );
  }
}
