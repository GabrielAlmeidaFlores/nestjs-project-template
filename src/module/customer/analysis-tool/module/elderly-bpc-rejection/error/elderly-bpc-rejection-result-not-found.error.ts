import { NotFoundError } from '@core/error/not-found.error';

export class ElderlyBpcRejectionResultNotFoundError extends NotFoundError {
  protected override readonly _type =
    ElderlyBpcRejectionResultNotFoundError.name;

  public constructor() {
    super(
      'Resultado da análise de Indeferimento de BPC Idoso não encontrado. Por favor, realize a análise completa primeiro.',
    );
  }
}
