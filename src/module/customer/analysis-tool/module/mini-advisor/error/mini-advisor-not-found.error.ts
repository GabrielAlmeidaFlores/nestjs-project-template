import { NotFoundError } from '@core/error/not-found.error';

export class MiniAdvisorNotFoundError extends NotFoundError {
  protected override readonly _type = MiniAdvisorNotFoundError.name;

  public constructor() {
    super('Mini orientador não encontrado. Por favor, verifique o ID informado.');
  }
}
