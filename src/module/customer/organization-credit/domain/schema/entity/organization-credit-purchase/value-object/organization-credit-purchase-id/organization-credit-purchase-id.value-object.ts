import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class OrganizationCreditPurchaseId extends Guid {
  protected override readonly _type = OrganizationCreditPurchaseId.name;
}
