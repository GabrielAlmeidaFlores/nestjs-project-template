import { UnexpectedError } from '@core/error/unexpected.error';

export class InvalidFormDataStructureError extends UnexpectedError {
  protected override readonly _type = InvalidFormDataStructureError.name;

  public constructor() {
    super(
      'Estrutura de form-data inválida: a requisição deve conter apenas campos do tipo FileModel e um único campo "json" com o objeto da requisição',
    );
  }
}
