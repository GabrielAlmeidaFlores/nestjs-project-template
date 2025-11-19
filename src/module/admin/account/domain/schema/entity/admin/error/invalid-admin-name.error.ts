import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidAdminNameError extends InvalidInputError {
  protected override readonly _type = InvalidAdminNameError.name;

  public constructor(props: { maxLength: number; minLength: number }) {
    super(
      `O nome deve conter de ${props.minLength} a ${props.maxLength} caracteres e pode incluir apenas letras, espaços e caracteres especiais.`,
    );
  }
}
