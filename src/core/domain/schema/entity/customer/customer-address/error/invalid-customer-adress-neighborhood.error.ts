import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidNeighborhoodError extends InvalidInputError {
  protected override readonly _type = InvalidNeighborhoodError.name;

  public constructor(props: { maxLength: number; minLength: number }) {
    super(
      `O nome do bairro deve conter de ${props.minLength} a ${props.maxLength} caracteres e pode incluir apenas letras, espaços e caracteres especiais (acentuação)`,
    );
  }
}
