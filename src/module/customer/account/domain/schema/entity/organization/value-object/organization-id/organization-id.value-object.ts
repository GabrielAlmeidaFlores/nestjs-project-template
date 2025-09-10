import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class OrganizationId extends Guid {
  protected override readonly _type = OrganizationId.name;
}
