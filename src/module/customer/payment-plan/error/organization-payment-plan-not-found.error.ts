import { NotFoundError } from '@core/error/not-found.error';

export class OrganizationPaymentPlanNotFoundError extends NotFoundError {
  protected override readonly _type = OrganizationPaymentPlanNotFoundError.name;

  public constructor() {
    super('Nenhuma assinatura ativa encontrada.');
  }
}
