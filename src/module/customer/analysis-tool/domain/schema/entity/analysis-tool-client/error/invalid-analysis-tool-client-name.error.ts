import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidAnalysisToolClientNameError extends InvalidInputError {
  protected override readonly _type = InvalidAnalysisToolClientNameError.name;

  public constructor(props: { maxLength: number; minLength: number }) {
    super(
      `O nome do client deve conter de ${props.minLength} a ${props.maxLength} caracteres e pode incluir apenas letras, espaços e caracteres especiais.`,
    );
  }
}
