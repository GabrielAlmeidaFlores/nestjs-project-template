import { NotFoundError } from '@core/error/not-found.error';

export class PaymentPlanNotFoundError extends NotFoundError {
  protected override readonly _type = PaymentPlanNotFoundError.name;

  public constructor() {
    super('Plano de pagamento não encontrado.');
  }
}
