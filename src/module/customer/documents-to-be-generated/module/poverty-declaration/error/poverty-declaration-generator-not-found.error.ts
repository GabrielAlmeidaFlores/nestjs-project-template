import { NotFoundError } from '@core/error/not-found.error';

export class PovertyDeclarationGeneratorNotFoundError extends NotFoundError {
  protected override readonly _type =
    PovertyDeclarationGeneratorNotFoundError.name;

  public constructor() {
    super(
      'Análise do gerador de declaração de hipossuficiência não encontrada.',
    );
  }
}
