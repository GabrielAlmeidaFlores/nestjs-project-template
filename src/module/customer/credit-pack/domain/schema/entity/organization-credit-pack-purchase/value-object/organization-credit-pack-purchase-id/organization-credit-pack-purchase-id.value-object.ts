import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class OrganizationCreditPackPurchaseId extends Guid {
  protected override readonly _type = OrganizationCreditPackPurchaseId.name;
}
