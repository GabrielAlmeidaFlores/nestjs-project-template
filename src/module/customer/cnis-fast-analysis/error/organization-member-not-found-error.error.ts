import { NotFoundError } from '@core/error/not-found.error';

export class OrganizationMemberNotFoundError extends NotFoundError {
  protected override readonly _type = OrganizationMemberNotFoundError.name;

  public constructor() {
    super('Membro da organização não encontrado');
  }
}
