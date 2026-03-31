import { NotFoundError } from '@core/error/not-found.error';

export class OrganizationCustomizationNotFoundError extends NotFoundError {
  protected override readonly _type =
    OrganizationCustomizationNotFoundError.name;

  public constructor() {
    super('Personalização da organização não encontrada.');
  }
}
