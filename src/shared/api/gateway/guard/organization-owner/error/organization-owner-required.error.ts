import { ForbiddenError } from '@core/error/forbidden.error';

export class OrganizationOwnerRequiredError extends ForbiddenError {
  protected override readonly _type = OrganizationOwnerRequiredError.name;

  public constructor() {
    super(
      'Apenas o proprietário da organização pode realizar assinaturas ou cancelamentos.',
    );
  }
}
