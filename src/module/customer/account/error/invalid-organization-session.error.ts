import { ForbiddenError } from '@core/error/forbidden.error';

export class InvalidOrganizationSessionError extends ForbiddenError {
  protected override readonly _type = InvalidOrganizationSessionError.name;

  public constructor() {
    super('O token da organização informado não é válido');
  }
}
