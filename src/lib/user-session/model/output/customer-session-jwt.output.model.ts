import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class CustomerSessionJwtOutputModel extends BaseBuildableObject {
  public customerId: string;
  public sessionId: string;

  protected override readonly _type = CustomerSessionJwtOutputModel.name;
}
