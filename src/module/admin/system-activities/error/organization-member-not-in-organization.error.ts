import { InvalidInputError } from '@core/error/invalid-input.error';

export class OrganizationMemberNotInOrganizationError extends InvalidInputError {
  protected override readonly _type =
    OrganizationMemberNotInOrganizationError.name;

  public constructor() {
    super('O colaborador informado não pertence à organização informada.');
  }
}
