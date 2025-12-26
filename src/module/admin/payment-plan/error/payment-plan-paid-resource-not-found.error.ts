import { NotFoundError } from '@core/error/not-found.error';

export class PaymentPlanPaidResourceNotFoundError extends NotFoundError {
  protected override readonly _type = PaymentPlanPaidResourceNotFoundError.name;

  public constructor() {
    super('Recurso pago não encontrado.');
  }
}
