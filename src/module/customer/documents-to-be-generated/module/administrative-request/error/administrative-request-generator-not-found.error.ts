import { NotFoundError } from '@core/error/not-found.error';

export class AdministrativeRequestGeneratorNotFoundError extends NotFoundError {
  protected override readonly _type =
    AdministrativeRequestGeneratorNotFoundError.name;

  public constructor() {
    super('Análise do gerador de requerimento administrativo não encontrada.');
  }
}
