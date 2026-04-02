import { NotFoundError } from '@core/error/not-found.error';

export class SupportAttendantNotFoundError extends NotFoundError {
  protected override readonly _type = SupportAttendantNotFoundError.name;

  public constructor() {
    super('Atendente de suporte não encontrado.');
  }
}
