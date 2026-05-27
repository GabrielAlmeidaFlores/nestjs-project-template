import { NotFoundError } from '@core/error/not-found.error';

export class UserNotFoundError extends NotFoundError {
  protected override readonly _type = UserNotFoundError.name;

  public constructor() {
    super('User not found.');
  }
}
