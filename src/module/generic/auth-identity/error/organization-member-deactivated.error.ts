import { UnauthorizedError } from '@core/error/unauthorized.error';

export class OrganizationMemberDeactivatedError extends UnauthorizedError {
  protected override readonly _type = OrganizationMemberDeactivatedError.name;

  public constructor() {
    super(
      'Sua conta foi inativada pela organização. Entre em contato com o responsável para reativar seu acesso.',
    );
  }
}
