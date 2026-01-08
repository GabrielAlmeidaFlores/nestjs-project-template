import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class OrganizationPaymentPlanEnabledPaidResourceId extends Guid {
  protected override readonly _type =
    OrganizationPaymentPlanEnabledPaidResourceId.name;
}
