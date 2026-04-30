import { NotFoundError } from '@core/error/not-found.error';

export class TemporaryDisabilityBenefitsTerminatedCnisDocumentNotFoundError extends NotFoundError {
  protected override readonly _type =
    TemporaryDisabilityBenefitsTerminatedCnisDocumentNotFoundError.name;

  public constructor() {
    super('Documento CNIS não encontrado. Por favor, faça o upload do CNIS.');
  }
}
