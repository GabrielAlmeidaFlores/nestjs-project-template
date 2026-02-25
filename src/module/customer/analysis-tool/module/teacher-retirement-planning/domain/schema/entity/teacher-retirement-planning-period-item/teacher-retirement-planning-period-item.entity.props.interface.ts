import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TeacherRetirementPlanningPeriodEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period/teacher-retirement-planning-period.entity';
import type { TeacherRetirementPlanningPeriodItemEducationLevelEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item/enum/teacher-retirement-planning-period-item-education-level.enum';
import type { TeacherRetirementPlanningPeriodItemInstitutionTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item/enum/teacher-retirement-planning-period-item-institution-type.enum';
import type { TeacherRetirementPlanningPeriodItemRolePerformedEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item/enum/teacher-retirement-planning-period-item-role-performed.enum';
import type { TeacherRetirementPlanningPeriodItemId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item/value-object/teacher-retirement-planning-period-item-id.value-object';

export interface TeacherRetirementPlanningPeriodItemEntityPropsInterface extends BaseEntityPropsInterface<TeacherRetirementPlanningPeriodItemId> {
  startDate: Date;
  endDate: Date;
  institutionName: string;
  institutionType: TeacherRetirementPlanningPeriodItemInstitutionTypeEnum;
  educationLevel: TeacherRetirementPlanningPeriodItemEducationLevelEnum;
  rolePerformed: TeacherRetirementPlanningPeriodItemRolePerformedEnum;
  teacherRetirementPlanningPeriod: TeacherRetirementPlanningPeriodEntity;
}
