import { ForbiddenError } from '@core/error/forbidden.error';

export class OrganizationMemberLimitReachedError extends ForbiddenError {
  protected override readonly _type = OrganizationMemberLimitReachedError.name;

  public constructor() {
    super('Limite de colaboradores do plano atingido.');
  }
}
