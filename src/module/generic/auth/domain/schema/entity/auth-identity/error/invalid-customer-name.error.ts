import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidPasswordError extends InvalidInputError {
  protected override readonly _type = InvalidPasswordError.name;

  public constructor(props: { maxLength: number; minLength: number }) {
    super(
      `A senha deve conter de ${props.minLength} a ${props.maxLength} caracteres.`,
    );
  }
}
