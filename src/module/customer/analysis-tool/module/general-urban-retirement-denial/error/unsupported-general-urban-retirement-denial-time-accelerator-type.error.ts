import { InvalidInputError } from '@core/error/invalid-input.error';

export class UnsupportedGeneralUrbanRetirementDenialTimeAcceleratorTypeError extends InvalidInputError {
  protected override readonly _type =
    UnsupportedGeneralUrbanRetirementDenialTimeAcceleratorTypeError.name;

  public constructor() {
    super(
      'O tipo de acelerador de tempo informado não é suportado para o fluxo de indeferimento de aposentadoria urbana comum.',
    );
  }
}
