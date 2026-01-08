import { ForbiddenError } from '@core/error/forbidden.error';

export class ConversationAccessDeniedError extends ForbiddenError {
  protected override readonly _type = ConversationAccessDeniedError.name;

  public constructor() {
    super('Acesso negado a esta conversa');
  }
}
