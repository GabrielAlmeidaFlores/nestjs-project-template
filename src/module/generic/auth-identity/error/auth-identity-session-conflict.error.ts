import { ConflictError } from '@core/error/conflict.error';

export class AuthIdentitySessionConflictError extends ConflictError {
  protected override readonly _type = AuthIdentitySessionConflictError.name;

  public constructor() {
    super(
      'Sua conta está atualmente ativa em outro dispositivo. Para continuar, você será desconectado do outro dispositivo',
    );
  }
}
