import { NotFoundError } from '@core/error/not-found.error';

export class ConversationNotFoundError extends NotFoundError {
  public constructor() {
    super('Conversa não encontrada');
  }
}
