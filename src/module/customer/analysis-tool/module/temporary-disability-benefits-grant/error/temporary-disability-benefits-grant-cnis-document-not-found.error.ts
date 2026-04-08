import { NotFoundError } from '@core/error/not-found.error';

export class TemporaryDisabilityBenefitsGrantCnisDocumentNotFoundError extends NotFoundError {
  protected override readonly _type =
    TemporaryDisabilityBenefitsGrantCnisDocumentNotFoundError.name;

  public constructor() {
    super(
      'Documento CNIS da análise de concessão de benefício por incapacidade temporária não encontrado.',
    );
  }
}
