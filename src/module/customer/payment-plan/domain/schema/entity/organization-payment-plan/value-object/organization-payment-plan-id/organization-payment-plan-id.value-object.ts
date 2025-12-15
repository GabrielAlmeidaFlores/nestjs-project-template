import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class OrganizationPaymentPlanId extends Guid {
  protected override readonly _type = OrganizationPaymentPlanId.name;
}
