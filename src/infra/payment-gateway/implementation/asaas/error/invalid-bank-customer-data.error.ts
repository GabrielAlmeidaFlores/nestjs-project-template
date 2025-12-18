import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidBankCustomerDataError extends InvalidInputError {
  protected override readonly _type = InvalidBankCustomerDataError.name;

  public constructor(props: { message: string }) {
    super(props.message);
  }
}
