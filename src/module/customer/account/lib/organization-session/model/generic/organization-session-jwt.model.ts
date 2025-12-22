import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class OrganizationSessionJwtModel extends BaseBuildableObject {
  public organizationId: string;
  public owner: boolean;

  protected override readonly _type = OrganizationSessionJwtModel.name;
}
