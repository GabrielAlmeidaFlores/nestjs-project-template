import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { TeacherRetirementPlanningInssBenefitId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-inss-benefit/value-object/teacher-retirement-planning-inss-benefit-id.value-object';

export class GetTeacherRetirementPlanningInssBenefitQueryResult extends BaseBuildableObject {
  public readonly id: TeacherRetirementPlanningInssBenefitId;
  public readonly inssBenefitNumber: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetTeacherRetirementPlanningInssBenefitQueryResult.name;
}
