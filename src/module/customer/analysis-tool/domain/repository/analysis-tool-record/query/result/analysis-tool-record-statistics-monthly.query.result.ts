import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class GetAnalysisToolRecordStatisticsMonthlyQueryResult extends BaseBuildableObject {
  public readonly totalCount: number;
  public readonly month: number;

  protected override readonly _type =
    GetAnalysisToolRecordStatisticsMonthlyQueryResult.name;
}
