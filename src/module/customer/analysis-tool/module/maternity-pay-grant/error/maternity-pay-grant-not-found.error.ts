import { NotFoundError } from '@core/error/not-found.error';

export class MaternityPayGrantNotFoundError extends NotFoundError {
  protected override readonly _type = MaternityPayGrantNotFoundError.name;

  public constructor() {
    super(
      'Concessão de salário-maternidade não encontrada. Por favor, verifique o ID informado.',
    );
  }
}
