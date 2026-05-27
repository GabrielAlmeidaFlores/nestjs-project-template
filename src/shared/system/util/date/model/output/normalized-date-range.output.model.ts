import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class NormalizedDateRangeOutputModel extends BaseBuildableObject {
  public startDate: Date | null;
  public endDate: Date | null;
  protected override readonly _type = NormalizedDateRangeOutputModel.name;
}
