import { NotFoundError } from '@core/error/not-found.error';

export class DeathBenefitRejectionCnisDocumentNotFoundError extends NotFoundError {
  protected override readonly _type =
    DeathBenefitRejectionCnisDocumentNotFoundError.name;

  public constructor() {
    super(
      'Documento CNIS da análise não encontrado. Por favor, envie o documento antes de gerar a first analysis.',
    );
  }
}
