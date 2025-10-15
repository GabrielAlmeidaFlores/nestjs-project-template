import { UnexpectedError } from '@core/error/unexpected.error';

export class UnexpectedHtmlToDocxReturnTypeError extends UnexpectedError {
  protected override readonly _type = UnexpectedHtmlToDocxReturnTypeError.name;

  public constructor() {
    super('Tipo de retorno inesperado do HtmlToDocx');
  }
}
