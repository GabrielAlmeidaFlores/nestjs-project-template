import { ForbiddenError } from '@core/error/forbidden.error';

export class SupportTicketAccessDeniedError extends ForbiddenError {
  protected override readonly _type = SupportTicketAccessDeniedError.name;

  public constructor() {
    super(
      'Acesso negado a este chamado. Você não tem permissão para realizar esta ação.',
    );
  }
}
