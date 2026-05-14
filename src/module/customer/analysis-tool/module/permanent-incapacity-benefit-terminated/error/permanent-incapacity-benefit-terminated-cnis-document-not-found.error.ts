import { NotFoundError } from '@core/error/not-found.error';

export class PermanentIncapacityBenefitTerminatedCnisDocumentNotFoundError extends NotFoundError {
  protected override readonly _type =
    PermanentIncapacityBenefitTerminatedCnisDocumentNotFoundError.name;

  public constructor() {
    super('Documento CNIS não encontrado. Por favor, faça o upload do CNIS.');
  }
}
