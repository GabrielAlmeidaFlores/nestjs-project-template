import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class CreateCustomerOutputModel extends BaseBuildableObject {
  public readonly id: string;

  protected override readonly _type = CreateCustomerOutputModel.name;
}
