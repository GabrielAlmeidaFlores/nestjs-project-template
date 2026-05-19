import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidBenefitTypeForDocumentAnalysisError extends InvalidInputError {
  protected override readonly _type =
    InvalidBenefitTypeForDocumentAnalysisError.name;

  public constructor() {
    super(
      'Tipo de benefício inválido para análise de documentos. Use FEDERATIVE_ENTITY_REVIEW ou BENEFIT_GRANTED_REVIEW.',
    );
  }
}
