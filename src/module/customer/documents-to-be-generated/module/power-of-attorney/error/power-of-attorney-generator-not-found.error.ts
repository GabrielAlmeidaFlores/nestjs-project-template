import { NotFoundError } from '@core/error/not-found.error';

export class PowerOfAttorneyGeneratorNotFoundError extends NotFoundError {
  protected override readonly _type = PowerOfAttorneyGeneratorNotFoundError.name;

  public constructor() {
    super('Análise do gerador de procuração não encontrada.');
  }
}
