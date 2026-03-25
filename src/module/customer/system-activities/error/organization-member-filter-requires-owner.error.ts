import { ForbiddenError } from '@core/error/forbidden.error';

export class OrganizationMemberFilterRequiresOwnerError extends ForbiddenError {
  protected override readonly _type =
    OrganizationMemberFilterRequiresOwnerError.name;

  public constructor() {
    super(
      'Apenas o proprietário da organização pode filtrar movimentações por colaborador.',
    );
  }
}
