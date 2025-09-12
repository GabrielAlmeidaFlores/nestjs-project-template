import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidOrganizationNameError extends InvalidInputError {
  protected override readonly _type = InvalidOrganizationNameError.name;

  public constructor(props: { maxLength: number; minLength: number }) {
    super(
      `O nome da organização deve conter de ${props.minLength} a ${props.maxLength} caracteres e pode incluir apenas letras, números, espaços e caracteres especiais.`,
    );
  }
}
