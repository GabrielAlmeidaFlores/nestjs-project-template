import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class LegalPleadingMonthlyStatisticsMonthlyQueryResult extends BaseBuildableObject {
  public readonly totalCount: number;
  public readonly month: number;

  protected override readonly _type =
    LegalPleadingMonthlyStatisticsMonthlyQueryResult.name;
}
