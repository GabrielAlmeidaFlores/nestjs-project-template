import { NotFoundError } from '@core/error/not-found.error';

export class ChatPersonaNotFoundError extends NotFoundError {
  protected override readonly _type = ChatPersonaNotFoundError.name;

  public constructor() {
    super('Identidade do chat não definida.');
  }
}
