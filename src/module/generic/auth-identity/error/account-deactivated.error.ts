import { UnauthorizedError } from '@core/error/unauthorized.error';

export class AccountDeactivatedError extends UnauthorizedError {
  protected override readonly _type = AccountDeactivatedError.name;

  public constructor() {
    super(
      'Your account has been deactivated. Please contact support for more information.',
    );
  }
}
