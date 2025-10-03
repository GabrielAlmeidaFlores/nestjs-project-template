import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidCnisFastAnalysisClientNameError extends InvalidInputError {
  protected override readonly _type =
    InvalidCnisFastAnalysisClientNameError.name;

  public constructor(props: { maxLength: number; minLength: number }) {
    super(
      `O nome do client deve conter de ${props.minLength} a ${props.maxLength} caracteres e pode incluir apenas letras, espaços e caracteres especiais.`,
    );
  }
}
