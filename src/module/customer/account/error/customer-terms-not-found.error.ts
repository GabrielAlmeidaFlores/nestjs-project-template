import { NotFoundError } from '@core/error/not-found.error';

export class CustomerTermsNotFoundError extends NotFoundError {
  protected override readonly _type = CustomerTermsNotFoundError.name;

  public constructor() {
    super('Os termos não foram encontrados');
  }
}
