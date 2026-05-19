import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class GetDisabilityRetirementPlanningInssBenefitQueryResult extends BaseBuildableObject {
  public readonly id: string;
  public readonly benefitNumber: string;

  protected override readonly _type =
    GetDisabilityRetirementPlanningInssBenefitQueryResult.name;
}
