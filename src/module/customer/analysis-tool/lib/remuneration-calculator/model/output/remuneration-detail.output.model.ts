import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class RemunerationDetailOutputModel extends BaseBuildableObject {
  public readonly remunerationDate: Date;
  public readonly remunerationAmount: number;
  public readonly correctionFactor: number;
  public readonly updatedRemunerationAmount: number;

  protected override readonly _type = RemunerationDetailOutputModel.name;
}
