import { ConflictError } from '@core/error/conflict.error';

export class InviteEmailAlreadyInUseError extends ConflictError {
  protected override readonly _type = InviteEmailAlreadyInUseError.name;

  public constructor() {
    super('O e-mail informado já está em uso por outro usuário.');
  }
}
