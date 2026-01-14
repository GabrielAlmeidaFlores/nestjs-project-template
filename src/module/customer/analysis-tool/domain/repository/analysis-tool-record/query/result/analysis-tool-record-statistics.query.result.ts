import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class MonthlyStatisticsQueryResult extends BaseBuildableObject {
  public readonly year: number;
  public readonly month: string;
  public readonly count: number;

  protected override readonly _type = MonthlyStatisticsQueryResult.name;
}

export class AnalysisToolRecordStatisticsQueryResult extends BaseBuildableObject {
  public readonly totalCount: number;
  public readonly monthlyStatistics: MonthlyStatisticsQueryResult[];

  protected override readonly _type =
    AnalysisToolRecordStatisticsQueryResult.name;
}
