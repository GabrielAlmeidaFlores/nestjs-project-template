import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class OrganizationSessionJwtModel extends BaseBuildableObject {
  public organizationId: string;

  protected override readonly _type = OrganizationSessionJwtModel.name;
}
