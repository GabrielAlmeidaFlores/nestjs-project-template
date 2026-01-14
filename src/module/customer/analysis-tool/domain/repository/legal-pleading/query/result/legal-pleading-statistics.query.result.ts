import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class LegalPleadingMonthlyStatisticsQueryResult extends BaseBuildableObject {
  public readonly year: number;
  public readonly month: string;
  public readonly count: number;

  protected override readonly _type =
    LegalPleadingMonthlyStatisticsQueryResult.name;
}

export class LegalPleadingStatisticsQueryResult extends BaseBuildableObject {
  public readonly totalCount: number;
  public readonly monthlyStatistics: LegalPleadingMonthlyStatisticsQueryResult[];

  protected override readonly _type = LegalPleadingStatisticsQueryResult.name;
}
