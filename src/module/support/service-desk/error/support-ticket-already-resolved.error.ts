import { ConflictError } from '@core/error/conflict.error';

export class SupportTicketAlreadyResolvedError extends ConflictError {
  protected override readonly _type = SupportTicketAlreadyResolvedError.name;

  public constructor() {
    super('Não é permitido enviar mensagem em ticket já resolvido.');
  }
}
