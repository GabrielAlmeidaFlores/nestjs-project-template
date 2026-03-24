import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';

import type { OrganizationPaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/value-object/organization-payment-plan-id/organization-payment-plan-id.value-object';

export class ListAffiliateCommissionsQueryParam extends ListDataInputModel {
  public readonly from: Date | null;
  public readonly to: Date | null;
  public readonly plan: OrganizationPaymentPlanId | null;
  public readonly searchBy: string | null;

  protected override readonly _type = ListAffiliateCommissionsQueryParam.name;

  public constructor(props: Partial<ListAffiliateCommissionsQueryParam> = {}) {
    super(props);
    this.from = props.from ?? null;
    this.to = props.to ?? null;
    this.plan = props.plan ?? null;
    this.searchBy = props.searchBy ?? null;
  }
}
