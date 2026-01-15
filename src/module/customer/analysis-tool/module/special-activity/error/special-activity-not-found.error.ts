import { NotFoundError } from '@core/error/not-found.error';

export class SpecialActivityNotFoundError extends NotFoundError {
  protected override readonly _type = SpecialActivityNotFoundError.name;

  public constructor() {
    super('Atividade especial não encontrada');
  }
}
