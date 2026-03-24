import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';

import type { OrganizationPaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/organization-payment-plan/value-object/organization-payment-plan-id/organization-payment-plan-id.value-object';

export class ListAffiliateCommissionsQueryParam extends ListDataInputModel {
  public readonly startDate: Date | null;
  public readonly endDate: Date | null;
  public readonly plan: OrganizationPaymentPlanId | null;
  public readonly searchBy: string | null;

  protected override readonly _type = ListAffiliateCommissionsQueryParam.name;

  public constructor(props: Partial<ListAffiliateCommissionsQueryParam> = {}) {
    super(props);
    this.startDate = props.startDate ?? null;
    this.endDate = props.endDate ?? null;
    this.plan = props.plan ?? null;
    this.searchBy = props.searchBy ?? null;
  }
}
