import { NotFoundError } from '@core/error/not-found.error';

export class GeneralUrbanRetirementDenialCnisDocumentNotFoundError extends NotFoundError {
  protected override readonly _type =
    GeneralUrbanRetirementDenialCnisDocumentNotFoundError.name;

  public constructor() {
    super(
      'Documento CNIS da análise de indeferimento não encontrado. Por favor, envie o documento CNIS antes de gerar a first analysis.',
    );
  }
}
