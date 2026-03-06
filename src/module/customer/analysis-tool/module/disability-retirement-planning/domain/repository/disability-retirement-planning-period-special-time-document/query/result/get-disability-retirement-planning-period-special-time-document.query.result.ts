import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class GetDisabilityRetirementPlanningPeriodSpecialTimeDocumentQueryResult extends BaseBuildableObject {
  public readonly id: string;
  public readonly document: string;

  protected override readonly _type =
    GetDisabilityRetirementPlanningPeriodSpecialTimeDocumentQueryResult.name;
}
