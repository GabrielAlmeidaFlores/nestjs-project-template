import { ForbiddenError } from '@core/error/forbidden.error';

export class WrongSignInCredentialsError extends ForbiddenError {
  protected override readonly _type = WrongSignInCredentialsError.name;

  public constructor() {
    super('Invalid credentials. Please check your details and try again.');
  }
}
