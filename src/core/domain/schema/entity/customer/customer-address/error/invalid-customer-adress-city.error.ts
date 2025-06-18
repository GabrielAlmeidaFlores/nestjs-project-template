import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidCityError extends InvalidInputError {
  protected override readonly _type = InvalidCityError.name;

  public constructor(props: { maxLength: number; minLength: number }) {
    super(
      `O nome da cidade deve conter de ${props.minLength} a ${props.maxLength} caracteres e pode incluir apenas letras, espaços e caracteres especiais.`,
    );
  }
}
