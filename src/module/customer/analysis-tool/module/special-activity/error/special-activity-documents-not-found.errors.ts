import { NotFoundError } from '@core/error/not-found.error';

export class SpecialActivityDocumentsNotFoundError extends NotFoundError {
  protected override readonly _type =
    SpecialActivityDocumentsNotFoundError.name;

  public constructor() {
    super(
      'Não foi encontrado nenhum documento da Atividade Especial',
    );
  }
}
