import { NotFoundError } from '@core/error/not-found.error';

export class AdminNotFoundError extends NotFoundError {
  protected override readonly _type = AdminNotFoundError.name;

  public constructor() {
    super('O administrador não foi encontrado');
  }
}
