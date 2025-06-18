import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidCustomerAdressNeighborhoodError extends InvalidInputError {
  protected override readonly _type =
    InvalidCustomerAdressNeighborhoodError.name;

  public constructor(props: { maxLength: number; minLength: number }) {
    super(
      `O nome deve conter de ${props.minLength} a ${props.maxLength} caracteres.`,
    );
  }
}
