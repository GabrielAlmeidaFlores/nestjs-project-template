import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';

export class OrganizationSessionDataModel extends BaseBuildableObject {
  public organizationId: OrganizationId;

  protected override readonly _type = OrganizationSessionDataModel.name;
}
