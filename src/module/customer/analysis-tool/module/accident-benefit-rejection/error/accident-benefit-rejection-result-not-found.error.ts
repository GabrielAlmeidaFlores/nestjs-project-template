import { NotFoundError } from '@core/error/not-found.error';

export class AccidentBenefitRejectionResultNotFoundError extends NotFoundError {
  protected override readonly _type =
    AccidentBenefitRejectionResultNotFoundError.name;

  public constructor() {
    super(
      'Resultado da análise de indeferimento de benefício acidentário não encontrado.',
    );
  }
}
