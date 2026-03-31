import { ConflictError } from '@core/error/conflict.error';

export class SupportAttendantInviteResendTooSoonError extends ConflictError {
  protected override readonly _type =
    SupportAttendantInviteResendTooSoonError.name;

  public constructor() {
    super(
      'Um convite já foi enviado recentemente para este e-mail. Aguarde 1 minuto antes de reenviar.',
    );
  }
}
