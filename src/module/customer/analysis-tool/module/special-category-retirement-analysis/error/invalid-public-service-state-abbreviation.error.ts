import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidPublicServiceStateAbbreviationError extends InvalidInputError {
  protected override readonly _type =
    InvalidPublicServiceStateAbbreviationError.name;

  public constructor() {
    super(
      'A sigla do estado informada não é válida. Informe uma sigla com no máximo 2 caracteres.',
    );
  }
}
