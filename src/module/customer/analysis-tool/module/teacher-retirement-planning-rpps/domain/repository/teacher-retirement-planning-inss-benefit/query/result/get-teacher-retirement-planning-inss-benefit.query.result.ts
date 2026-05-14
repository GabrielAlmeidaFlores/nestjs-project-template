import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { TeacherRetirementPlanningRppsInssBenefitId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-inss-benefit/value-object/teacher-retirement-planning-inss-benefit-id.value-object';

export class GetTeacherRetirementPlanningRppsInssBenefitQueryResult extends BaseBuildableObject {
  public readonly id: TeacherRetirementPlanningRppsInssBenefitId;
  public readonly inssBenefitNumber: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetTeacherRetirementPlanningRppsInssBenefitQueryResult.name;
}
