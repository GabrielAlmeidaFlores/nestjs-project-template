import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class OrganizationCustomizationId extends Guid {
  protected override readonly _type = OrganizationCustomizationId.name;
}
