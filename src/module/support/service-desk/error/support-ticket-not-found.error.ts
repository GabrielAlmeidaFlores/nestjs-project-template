import { NotFoundError } from '@core/error/not-found.error';

export class SupportTicketNotFoundError extends NotFoundError {
  protected override readonly _type = SupportTicketNotFoundError.name;

  public constructor() {
    super('Ticket de suporte não encontrado.');
  }
}
