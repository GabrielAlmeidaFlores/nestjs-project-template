import { ForbiddenError } from '@core/error/forbidden.error';

export class OrganizationNotAvailableForCustomerError extends ForbiddenError {
  protected override readonly _type =
    OrganizationNotAvailableForCustomerError.name;

  public constructor() {
    super('O cliente não possui acesso à organização informada');
  }
}
