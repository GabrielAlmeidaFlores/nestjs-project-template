import { NotFoundError } from '@core/error/not-found.error';

export class EmailTemplateNotFoundError extends NotFoundError {
  protected override readonly _type = EmailTemplateNotFoundError.name;

  public constructor() {
    super('Template de e-mail não encontrado');
  }
}
