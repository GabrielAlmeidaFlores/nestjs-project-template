import { ForbiddenError } from '@core/error/forbidden.error';

export class PaymentPlanInactiveError extends ForbiddenError {
  protected override readonly _type = PaymentPlanInactiveError.name;

  public constructor() {
    super(
      'Seu plano de pagamento está inativo. Para continuar utilizando os recursos, é necessário regularizar os pagamentos.',
    );
  }
}
