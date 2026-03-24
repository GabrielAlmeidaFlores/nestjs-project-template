import { ForbiddenError } from '@core/error/forbidden.error';

export class OrganizationMemberOwnerCannotBeModifiedError extends ForbiddenError {
  protected override readonly _type =
    OrganizationMemberOwnerCannotBeModifiedError.name;

  public constructor() {
    super('O proprietário da organização não pode ser modificado.');
  }
}
