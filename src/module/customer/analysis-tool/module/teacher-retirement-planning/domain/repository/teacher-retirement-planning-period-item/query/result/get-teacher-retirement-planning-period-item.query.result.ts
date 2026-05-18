import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetTeacherRetirementPlanningPeriodItemDocumentQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/repository/teacher-retirement-planning-period-item-document/query/result/get-teacher-retirement-planning-period-item-document.query.result';
import type { TeacherRetirementPlanningPeriodItemEducationLevelEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item/enum/teacher-retirement-planning-period-item-education-level.enum';
import type { TeacherRetirementPlanningPeriodItemInstitutionTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item/enum/teacher-retirement-planning-period-item-institution-type.enum';
import type { TeacherRetirementPlanningPeriodItemRolePerformedEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item/enum/teacher-retirement-planning-period-item-role-performed.enum';
import type { TeacherRetirementPlanningPeriodItemId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item/value-object/teacher-retirement-planning-period-item-id.value-object';

export class GetTeacherRetirementPlanningPeriodItemQueryResult extends BaseBuildableObject {
  public readonly id: TeacherRetirementPlanningPeriodItemId;
  public readonly startDate: Date;
  public readonly endDate: Date | null;
  public readonly institutionName: string | null;
  public readonly institutionType: TeacherRetirementPlanningPeriodItemInstitutionTypeEnum | null;
  public readonly educationLevel: TeacherRetirementPlanningPeriodItemEducationLevelEnum | null;
  public readonly rolePerformed: TeacherRetirementPlanningPeriodItemRolePerformedEnum | null;
  public readonly documents: GetTeacherRetirementPlanningPeriodItemDocumentQueryResult[];
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetTeacherRetirementPlanningPeriodItemQueryResult.name;
}
