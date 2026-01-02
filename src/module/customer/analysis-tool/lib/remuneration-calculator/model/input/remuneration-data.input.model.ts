import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class RemunerationDataInputModel extends BaseBuildableObject {
  public readonly remunerationAmount: number;

  protected override readonly _type = RemunerationDataInputModel.name;
}
