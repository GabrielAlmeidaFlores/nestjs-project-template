import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidColorValueError extends InvalidInputError {
  protected override readonly _type = InvalidColorValueError.name;

  public constructor() {
    super(
      'Valor de cor inválido. Formatos aceitos: #RGB, #RRGGBB, rgb(r,g,b), rgba(r,g,b,a).',
    );
  }
}
