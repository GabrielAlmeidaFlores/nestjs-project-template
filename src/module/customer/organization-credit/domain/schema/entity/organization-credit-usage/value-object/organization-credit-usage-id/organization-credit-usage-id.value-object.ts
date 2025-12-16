import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class OrganizationCreditUsageId extends Guid {
  protected override readonly _type = OrganizationCreditUsageId.name;
}
