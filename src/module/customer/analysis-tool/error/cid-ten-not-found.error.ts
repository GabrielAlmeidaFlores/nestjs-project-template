import { NotFoundError } from '@core/error/not-found.error';

export class CidTenNotFoundError extends NotFoundError {
  protected override readonly _type = CidTenNotFoundError.name;

  public constructor() {
    super('CID-10 não encontrado');
  }
}
