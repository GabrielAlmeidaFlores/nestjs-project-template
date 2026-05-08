import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TeacherRetirementPlanningRppsPeriodEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period/teacher-retirement-planning-period.entity';
import type { TeacherRetirementPlanningRppsPeriodItemEducationLevelEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period-item/enum/teacher-retirement-planning-period-item-education-level.enum';
import type { TeacherRetirementPlanningRppsPeriodItemInstitutionTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period-item/enum/teacher-retirement-planning-period-item-institution-type.enum';
import type { TeacherRetirementPlanningRppsPeriodItemRolePerformedEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period-item/enum/teacher-retirement-planning-period-item-role-performed.enum';
import type { TeacherRetirementPlanningRppsPeriodItemId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period-item/value-object/teacher-retirement-planning-period-item-id.value-object';

export interface TeacherRetirementPlanningRppsPeriodItemEntityPropsInterface extends BaseEntityPropsInterface<TeacherRetirementPlanningRppsPeriodItemId> {
  startDate: Date;
  endDate: Date;
  institutionName: string;
  institutionType: TeacherRetirementPlanningRppsPeriodItemInstitutionTypeEnum;
  educationLevel: TeacherRetirementPlanningRppsPeriodItemEducationLevelEnum;
  rolePerformed: TeacherRetirementPlanningRppsPeriodItemRolePerformedEnum;
  teacherRetirementPlanningPeriod: TeacherRetirementPlanningRppsPeriodEntity;
}
