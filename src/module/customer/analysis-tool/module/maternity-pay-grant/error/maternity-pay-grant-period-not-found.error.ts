import { NotFoundError } from '@core/error/not-found.error';

export class MaternityPayGrantPeriodNotFoundError extends NotFoundError {
  protected override readonly _type = MaternityPayGrantPeriodNotFoundError.name;

  public constructor() {
    super(
      'Período de salário-maternidade não encontrado. Por favor, verifique o ID informado.',
    );
  }
}
