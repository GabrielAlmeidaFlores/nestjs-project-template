import { NotFoundError } from '@core/error/not-found.error';

export class MaternityPayRejectionCnisDocumentNotFoundError extends NotFoundError {
  protected override readonly _type =
    MaternityPayRejectionCnisDocumentNotFoundError.name;

  public constructor() {
    super(
      'Documento CNIS do indeferimento de salário maternidade não encontrado.',
    );
  }
}
