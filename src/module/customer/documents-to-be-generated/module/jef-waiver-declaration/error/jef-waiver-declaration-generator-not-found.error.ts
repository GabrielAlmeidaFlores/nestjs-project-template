import { NotFoundError } from '@core/error/not-found.error';

export class JefWaiverDeclarationGeneratorNotFoundError extends NotFoundError {
  protected override readonly _type =
    JefWaiverDeclarationGeneratorNotFoundError.name;

  public constructor() {
    super(
      'Análise do gerador de declaração de renúncia ao excedente do JEF não encontrada.',
    );
  }
}
