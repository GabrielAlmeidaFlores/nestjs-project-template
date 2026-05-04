import { NotFoundError } from '@core/error/not-found.error';

export class GeneralUrbanRetirementReviewCnisDocumentNotFoundError extends NotFoundError {
  protected override readonly _type =
    GeneralUrbanRetirementReviewCnisDocumentNotFoundError.name;

  public constructor() {
    super(
      'Documento CNIS da revisão não encontrado. Envie o CNIS antes de gerar a first analysis.',
    );
  }
}
