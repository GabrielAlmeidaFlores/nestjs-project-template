import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class GetRuralTimelineCnisContributionPeriodOverdueContributionQueryResult extends BaseBuildableObject {
  public readonly overdueDate: Date;
  public readonly paymentDate: Date | null;

  protected override readonly _type =
    GetRuralTimelineCnisContributionPeriodOverdueContributionQueryResult.name;
}
