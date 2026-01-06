import { NotFoundError } from '@core/error/not-found.error';

export class ConversationNotFoundError extends NotFoundError {
  protected override readonly _type = ConversationNotFoundError.name;

  public constructor() {
    super('Conversa não encontrada.');
  }
}
