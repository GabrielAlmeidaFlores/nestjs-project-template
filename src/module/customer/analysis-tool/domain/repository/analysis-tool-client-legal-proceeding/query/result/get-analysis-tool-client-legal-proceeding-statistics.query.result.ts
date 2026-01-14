import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class GetAnalysisToolClientLegalProceedingStatistics extends BaseBuildableObject {
  public readonly totalLegalProceedings: number;
  public readonly pendingLegalProceedings: number;
  public readonly completedLegalProceedings: number;
  public readonly legalProceedingWithOpenDeadlines: number;

  protected override readonly _type =
    GetAnalysisToolClientLegalProceedingStatistics.name;
}
