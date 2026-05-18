import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidRetirementPermanentDisabilityRevisionFirstAnalysisJsonError extends InvalidInputError {
  protected override readonly _type =
    InvalidRetirementPermanentDisabilityRevisionFirstAnalysisJsonError.name;

  public constructor() {
    super(
      'Não foi possível processar a primeira análise. O formato retornado pela IA é inválido.',
    );
  }
}
