import { NotFoundError } from '@core/error/not-found.error';

export class TemporaryIncapacityBenefitRejectionCnisDocumentNotFoundError extends NotFoundError {
  protected override readonly _type =
    TemporaryIncapacityBenefitRejectionCnisDocumentNotFoundError.name;

  public constructor() {
    super('Documento CNIS não encontrado. Por favor, faça o upload do CNIS.');
  }
}
