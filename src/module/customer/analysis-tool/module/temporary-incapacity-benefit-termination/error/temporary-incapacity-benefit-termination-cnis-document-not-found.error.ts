import { NotFoundError } from '@core/error/not-found.error';

export class TemporaryIncapacityBenefitTerminationCnisDocumentNotFoundError extends NotFoundError {
  protected override readonly _type =
    TemporaryIncapacityBenefitTerminationCnisDocumentNotFoundError.name;

  public constructor() {
    super('Documento CNIS não encontrado. Por favor, faça o upload do CNIS.');
  }
}
