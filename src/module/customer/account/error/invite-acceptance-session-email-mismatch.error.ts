import { ForbiddenError } from '@core/error/forbidden.error';

export class InviteAcceptanceSessionEmailMismatchError extends ForbiddenError {
  protected override readonly _type =
    InviteAcceptanceSessionEmailMismatchError.name;

  public constructor() {
    super('O e-mail informado não corresponde ao usuário autenticado.');
  }
}
