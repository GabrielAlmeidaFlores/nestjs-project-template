import { NotFoundError } from '@core/error/not-found.error';

export class AccidentBenefitRejectionNotFoundError extends NotFoundError {
  protected override readonly _type =
    AccidentBenefitRejectionNotFoundError.name;

  public constructor() {
    super('Análise de indeferimento de benefício acidentário não encontrada.');
  }
}
