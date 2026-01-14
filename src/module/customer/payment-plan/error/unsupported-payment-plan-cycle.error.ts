import { UnexpectedError } from '@core/error/unexpected.error';

export class OrganizationPaymentPlanNotFoundError extends UnexpectedError {
  protected override readonly _type = OrganizationPaymentPlanNotFoundError.name;

  public constructor() {
    super('Ciclo de plano de pagamento não suportado.');
  }
}
