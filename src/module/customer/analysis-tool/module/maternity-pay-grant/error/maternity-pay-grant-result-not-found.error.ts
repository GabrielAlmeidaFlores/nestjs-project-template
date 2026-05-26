import { NotFoundError } from '@core/error/not-found.error';

export class MaternityPayGrantResultNotFoundError extends NotFoundError {
  protected override readonly _type = MaternityPayGrantResultNotFoundError.name;

  public constructor() {
    super(
      'Diagnóstico integrado de salário-maternidade não encontrado. Gere a primeira análise antes de continuar para as regras aplicáveis.',
    );
  }
}
