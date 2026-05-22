import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class GetSurvivorPensionAnalysisDeceasedWorkHistoryRemunerationQueryResult extends BaseBuildableObject {
  public readonly remunerationDate: Date;
  public readonly remunerationAmount: number;

  protected override readonly _type =
    GetSurvivorPensionAnalysisDeceasedWorkHistoryRemunerationQueryResult.name;
}
