import { NotFoundError } from '@core/error/not-found.error';

export class MaternityPayRejectionResultNotFoundError extends NotFoundError {
  protected override readonly _type =
    MaternityPayRejectionResultNotFoundError.name;

  public constructor() {
    super(
      'Resultado da análise de indeferimento de salário maternidade não encontrado.',
    );
  }
}
