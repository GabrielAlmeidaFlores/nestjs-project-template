import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidAffiliateCustomerConfigValueError extends InvalidInputError {
  protected override readonly _type =
    InvalidAffiliateCustomerConfigValueError.name;

  public constructor(props: { message: string }) {
    super(props.message);
  }
}
