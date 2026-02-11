import { NotFoundError } from '@core/error/not-found.error';

export class InitialPetitionGeneratorNotFoundError extends NotFoundError {
  protected override readonly _type =
    InitialPetitionGeneratorNotFoundError.name;

  public constructor() {
    super('Análise do gerador de petição inicial não encontrada.');
  }
}
