import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { RetirementPlanningRppsInssBenefitId } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps-inss-benefit/value-object/retirement-planning-rpps-inss-benefit-id.value-object';

export class GetRetirementPlanningRppsInssBenefitQueryResult extends BaseBuildableObject {
  public readonly id: RetirementPlanningRppsInssBenefitId;
  public readonly inssBenefitNumber: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetRetirementPlanningRppsInssBenefitQueryResult.name;
}
