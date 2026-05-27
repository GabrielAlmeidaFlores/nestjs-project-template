import { InvalidInputError } from '@core/error/invalid-input.error';

export class NewPasswordMatchesCurrentError extends InvalidInputError {
  protected override readonly _type = NewPasswordMatchesCurrentError.name;

  public constructor() {
    super('The new password cannot be the same as the current password.');
  }
}
