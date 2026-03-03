import { UnauthorizedError } from '@core/error/unauthorized.error';

export class AccountDeactivatedError extends UnauthorizedError {
  protected override readonly _type = AccountDeactivatedError.name;

  public constructor() {
    super(
      'Sua conta foi desativada. Entre em contato com o suporte para mais informações.',
    );
  }
}
