import { NotFoundError } from '@core/error/not-found.error';

export class SupportTicketNotFoundError extends NotFoundError {
  protected override readonly _type = SupportTicketNotFoundError.name;

  public constructor() {
    super('Chamado de suporte não encontrado. Verifique o ID informado.');
  }
}
