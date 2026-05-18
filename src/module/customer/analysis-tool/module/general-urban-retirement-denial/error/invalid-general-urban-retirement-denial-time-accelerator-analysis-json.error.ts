import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidGeneralUrbanRetirementDenialTimeAcceleratorAnalysisJsonError extends InvalidInputError {
  protected override readonly _type =
    InvalidGeneralUrbanRetirementDenialTimeAcceleratorAnalysisJsonError.name;

  public constructor() {
    super(
      'O JSON retornado pela análise de acelerador de tempo do indeferimento de aposentadoria urbana comum é inválido.',
    );
  }
}
