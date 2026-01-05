import { ForbiddenError } from '@core/error/forbidden.error';

export class ConversationAccessDeniedError extends ForbiddenError {
  public constructor() {
    super('Acesso negado a esta conversa');
  }
}
