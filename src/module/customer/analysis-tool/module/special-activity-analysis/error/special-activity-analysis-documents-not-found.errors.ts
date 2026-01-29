import { NotFoundError } from '@core/error/not-found.error';

export class SpecialActivityAnalysisDocumentsNotFoundError extends NotFoundError {
  protected override readonly _type =
    SpecialActivityAnalysisDocumentsNotFoundError.name;

  public constructor() {
    super('Não foi encontrado nenhum documento da Atividade Especial');
  }
}
