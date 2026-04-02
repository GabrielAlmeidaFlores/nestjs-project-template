import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class OrganizationPaymentPlanAffiliateCommissionId extends Guid {
  protected override readonly _type =
    OrganizationPaymentPlanAffiliateCommissionId.name;
}
