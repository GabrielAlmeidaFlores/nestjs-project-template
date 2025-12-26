import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class OrganizationPaymentPlanBankPaymentId extends Guid {
  protected override readonly _type = OrganizationPaymentPlanBankPaymentId.name;
}
