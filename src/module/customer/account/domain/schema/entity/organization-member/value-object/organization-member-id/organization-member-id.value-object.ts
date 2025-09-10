import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class OrganizationMemberId extends Guid {
  protected override readonly _type = OrganizationMemberId.name;
}
