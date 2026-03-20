import { NotFoundError } from '@core/error/not-found.error';

export class AffiliateCustomerNotFoundError extends NotFoundError {
  protected override readonly _type = AffiliateCustomerNotFoundError.name;

  public constructor() {
    super('Afiliado não encontrado');
  }
}
