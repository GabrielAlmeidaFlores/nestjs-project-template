import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class CreateSubscriptionOutputModel extends BaseBuildableObject {
  public readonly id: string;

  protected override readonly _type = CreateSubscriptionOutputModel.name;
}
