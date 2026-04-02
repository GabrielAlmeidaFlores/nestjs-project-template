import { NotFoundError } from '@core/error/not-found.error';

export class SupportAccountNotFoundError extends NotFoundError {
  protected override readonly _type = SupportAccountNotFoundError.name;

  public constructor() {
    super('A conta de suporte não foi encontrada');
  }
}
