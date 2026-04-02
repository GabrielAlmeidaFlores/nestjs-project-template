import { UnauthorizedError } from '@core/error/unauthorized.error';

export class OrganizationMemberRemovedError extends UnauthorizedError {
  protected override readonly _type = OrganizationMemberRemovedError.name;

  public constructor() {
    super(
      'Você foi removido da organização e não possui mais acesso. Entre em contato com o responsável.',
    );
  }
}
