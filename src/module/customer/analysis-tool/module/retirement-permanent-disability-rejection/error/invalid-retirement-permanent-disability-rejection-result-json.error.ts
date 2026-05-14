import { UnexpectedError } from '@core/error/unexpected.error';

export class InvalidRetirementPermanentDisabilityRejectionResultJsonError extends UnexpectedError {
  protected override readonly _type =
    InvalidRetirementPermanentDisabilityRejectionResultJsonError.name;

  public constructor() {
    super(
      'O resultado da análise retornado pela IA não está em um formato JSON válido.',
    );
  }
}
