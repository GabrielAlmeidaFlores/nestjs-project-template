import { NotFoundError } from '@core/error/not-found.error';

export class OrganizationPaymentPlanAffiliateCommissionNotFoundError extends NotFoundError {
  protected override readonly _type =
    OrganizationPaymentPlanAffiliateCommissionNotFoundError.name;

  public constructor() {
    super('Comissão de afiliado do plano não encontrada');
  }
}
