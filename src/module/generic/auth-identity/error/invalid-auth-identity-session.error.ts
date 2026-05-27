import { ForbiddenError } from '@core/error/forbidden.error';

export class InvalidAuthIdentitySessionError extends ForbiddenError {
  protected override readonly _type = InvalidAuthIdentitySessionError.name;

  public constructor() {
    super('Your authentication session has expired or is invalid.');
  }
}
