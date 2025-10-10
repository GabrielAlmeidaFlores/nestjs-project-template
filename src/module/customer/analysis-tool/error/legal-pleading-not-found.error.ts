import { NotFoundError } from '@core/error/not-found.error';

export class LegalPleadingNotFoundError extends NotFoundError {
  protected override readonly _type = LegalPleadingNotFoundError.name;

  public constructor() {
    super('Peça processual não encontrada');
  }
}
