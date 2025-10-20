import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidLegalPleadingBenefitTerminalDateError extends InvalidInputError {
  protected override readonly _type =
    InvalidLegalPleadingBenefitTerminalDateError.name;

  public constructor() {
    super(
      `Data de término do benefício relacionado deve ser anterior a data atual`,
    );
  }
}
