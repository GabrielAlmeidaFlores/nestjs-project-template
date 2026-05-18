import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class GetDisabilityRetirementPlanningLegalProceedingQueryResult extends BaseBuildableObject {
  public readonly id: string;
  public readonly legalProceedingNumber: string;

  protected override readonly _type =
    GetDisabilityRetirementPlanningLegalProceedingQueryResult.name;
}
