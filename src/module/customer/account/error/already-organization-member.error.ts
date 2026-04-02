import { ConflictError } from '@core/error/conflict.error';

export class AlreadyOrganizationMemberError extends ConflictError {
  protected override readonly _type = AlreadyOrganizationMemberError.name;

  public constructor() {
    super('Você já faz parte desta organização.');
  }
}
