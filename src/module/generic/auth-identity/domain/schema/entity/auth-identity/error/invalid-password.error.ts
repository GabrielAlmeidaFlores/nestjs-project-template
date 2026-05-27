import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidPasswordError extends InvalidInputError {
  protected override readonly _type = InvalidPasswordError.name;

  public constructor(props: { maxLength: number; minLength: number }) {
    super(
      `Password must be between ${props.minLength} and ${props.maxLength} characters.`,
    );
  }
}
