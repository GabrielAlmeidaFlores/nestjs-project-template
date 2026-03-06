import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class GetDisabilityRetirementPlanningPeriodDisabilityDocumentQueryResult extends BaseBuildableObject {
  public readonly id: string;
  public readonly document: string;

  protected override readonly _type =
    GetDisabilityRetirementPlanningPeriodDisabilityDocumentQueryResult.name;
}
