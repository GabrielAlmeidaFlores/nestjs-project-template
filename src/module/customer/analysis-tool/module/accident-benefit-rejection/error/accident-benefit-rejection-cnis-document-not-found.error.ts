import { NotFoundError } from '@core/error/not-found.error';

export class AccidentBenefitRejectionCnisDocumentNotFoundError extends NotFoundError {
  protected override readonly _type =
    AccidentBenefitRejectionCnisDocumentNotFoundError.name;

  public constructor() {
    super(
      'Documento CNIS da análise de indeferimento de benefício acidentário não encontrado.',
    );
  }
}
