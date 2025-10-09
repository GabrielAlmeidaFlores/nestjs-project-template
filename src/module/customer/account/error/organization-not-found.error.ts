import { NotFoundError } from '@core/error/not-found.error';

export class OrganizationNotFoundError extends NotFoundError {
  protected override readonly _type = OrganizationNotFoundError.name;

  public constructor() {
    super('Organização não encontrado');
  }
}
