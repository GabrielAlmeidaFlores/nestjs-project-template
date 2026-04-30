import { NotFoundError } from '@core/error/not-found.error';

export class MaternityPayRejectionNotFoundError extends NotFoundError {
  protected override readonly _type = MaternityPayRejectionNotFoundError.name;

  public constructor() {
    super('Análise de indeferimento de salário maternidade não encontrada.');
  }
}
