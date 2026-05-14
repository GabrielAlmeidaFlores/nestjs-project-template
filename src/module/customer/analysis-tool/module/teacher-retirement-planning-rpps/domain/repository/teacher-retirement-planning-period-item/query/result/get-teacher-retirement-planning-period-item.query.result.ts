import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetTeacherRetirementPlanningRppsPeriodItemDocumentQueryResult } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/repository/teacher-retirement-planning-period-item-document/query/result/get-teacher-retirement-planning-period-item-document.query.result';
import type { TeacherRetirementPlanningRppsPeriodItemEducationLevelEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period-item/enum/teacher-retirement-planning-period-item-education-level.enum';
import type { TeacherRetirementPlanningRppsPeriodItemInstitutionTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period-item/enum/teacher-retirement-planning-period-item-institution-type.enum';
import type { TeacherRetirementPlanningRppsPeriodItemRolePerformedEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period-item/enum/teacher-retirement-planning-period-item-role-performed.enum';
import type { TeacherRetirementPlanningRppsPeriodItemId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period-item/value-object/teacher-retirement-planning-period-item-id.value-object';

export class GetTeacherRetirementPlanningRppsPeriodItemQueryResult extends BaseBuildableObject {
  public readonly id: TeacherRetirementPlanningRppsPeriodItemId;
  public readonly startDate: Date;
  public readonly endDate: Date;
  public readonly institutionName: string;
  public readonly institutionType: TeacherRetirementPlanningRppsPeriodItemInstitutionTypeEnum;
  public readonly educationLevel: TeacherRetirementPlanningRppsPeriodItemEducationLevelEnum;
  public readonly rolePerformed: TeacherRetirementPlanningRppsPeriodItemRolePerformedEnum;
  public readonly documents: GetTeacherRetirementPlanningRppsPeriodItemDocumentQueryResult[];
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetTeacherRetirementPlanningRppsPeriodItemQueryResult.name;
}
