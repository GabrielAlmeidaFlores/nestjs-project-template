import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class PayBillingOutputModel extends BaseBuildableObject {
  public readonly id: string;

  protected override readonly _type = PayBillingOutputModel.name;
}
