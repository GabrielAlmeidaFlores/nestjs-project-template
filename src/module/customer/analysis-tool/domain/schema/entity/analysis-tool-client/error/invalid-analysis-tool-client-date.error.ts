import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidAnalysisToolClientBirthDateError extends InvalidInputError {
  protected override readonly _type =
    InvalidAnalysisToolClientBirthDateError.name;

  public constructor() {
    super(`A data de nacimento deve ser menor ou igual a data atual`);
  }
}
