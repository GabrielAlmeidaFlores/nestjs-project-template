import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidOrganizationInviteError extends InvalidInputError {
  protected override readonly _type = InvalidOrganizationInviteError.name;

  public constructor() {
    super('Código de convite inválido ou expirado.');
  }
}
