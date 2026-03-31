import { InvalidInputError } from '@core/error/invalid-input.error';

export class OrganizationInviteEmailMismatchError extends InvalidInputError {
  protected override readonly _type = OrganizationInviteEmailMismatchError.name;

  public constructor() {
    super('O e-mail informado não corresponde ao convite.');
  }
}
