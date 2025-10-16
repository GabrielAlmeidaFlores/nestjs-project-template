import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidLegalPleadingApplicationSubmitDateError extends InvalidInputError {
  protected override readonly _type =
    InvalidLegalPleadingApplicationSubmitDateError.name;

  public constructor() {
    super(
      `Data de submissão da solicitação relacionada deve ser anterior data atual`,
    );
  }
}
