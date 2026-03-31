import { ForbiddenError } from '@core/error/forbidden.error';

export class SupportTicketInvalidSupportTypeError extends ForbiddenError {
  protected override readonly _type = SupportTicketInvalidSupportTypeError.name;

  public constructor() {
    super(
      'Você não tem permissão para atender este tipo de chamado. O tipo de suporte do chamado não corresponde ao seu perfil.',
    );
  }
}
