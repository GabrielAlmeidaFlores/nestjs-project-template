import { NotFoundError } from '@core/error/not-found.error';

export class SupportAttendantInviteNotFoundError extends NotFoundError {
  protected override readonly _type = SupportAttendantInviteNotFoundError.name;

  public constructor() {
    super(
      'Convite de atendente não encontrado ou expirado. Solicite um novo convite ao administrador.',
    );
  }
}
