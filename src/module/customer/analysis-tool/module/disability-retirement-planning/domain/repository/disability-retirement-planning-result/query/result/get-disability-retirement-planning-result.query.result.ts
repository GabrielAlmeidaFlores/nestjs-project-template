import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class GetDisabilityRetirementPlanningResultQueryResult extends BaseBuildableObject {
  public readonly id: string;
  public readonly disabilityRetirementPlanningCompleteAnalysis: string | null;
  public readonly disabilityRetirementPlanningSimplifiedAnalysis: string | null;
  public readonly disabilityRetirementPlanningCompleteAnalysisDownload:
    | string
    | null;

  protected override readonly _type =
    GetDisabilityRetirementPlanningResultQueryResult.name;
}
