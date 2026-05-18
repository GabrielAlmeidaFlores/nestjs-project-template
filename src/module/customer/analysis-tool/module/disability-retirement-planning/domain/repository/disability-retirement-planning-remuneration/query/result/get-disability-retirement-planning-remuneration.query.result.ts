import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

export class GetDisabilityRetirementPlanningRemunerationQueryResult extends BaseBuildableObject {
  public readonly id: string;
  public readonly remunerationDate: Date;
  public readonly remunerationAmount: number;

  protected override readonly _type =
    GetDisabilityRetirementPlanningRemunerationQueryResult.name;
}
