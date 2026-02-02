import { NotFoundError } from '@core/error/not-found.error';

export class FullOpinionGeneratorNotFoundError extends NotFoundError {
  protected override readonly _type =
    FullOpinionGeneratorNotFoundError.name;

  public constructor() {
    super('Análise do gerador de parecer completo não encontrada.');
  }
}
