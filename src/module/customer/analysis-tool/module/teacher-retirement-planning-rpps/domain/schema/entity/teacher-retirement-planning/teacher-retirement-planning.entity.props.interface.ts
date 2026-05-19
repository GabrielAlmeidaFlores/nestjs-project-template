import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import type { TeacherRetirementPlanningRppsActivityTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning/enum/teacher-retirement-planning-activity-type.enum';
import type { TeacherRetirementPlanningRppsFederativeEntityEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning/enum/teacher-retirement-planning-federative-entity.enum';
import type { TeacherRetirementPlanningRppsId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning/value-object/teacher-retirement-planning-id.value-object';
import type { TeacherRetirementPlanningRppsResultEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-result/teacher-retirement-planning-result.entity';

export interface TeacherRetirementPlanningRppsEntityPropsInterface extends BaseEntityPropsInterface<TeacherRetirementPlanningRppsId> {
  federativeEntity?: TeacherRetirementPlanningRppsFederativeEntityEnum | null;
  state?: StateCodeEnum | null;
  municipality?: string | null;
  analysisName?: string | null;
  currentPosition?: string | null;
  activityType: TeacherRetirementPlanningRppsActivityTypeEnum;
  publicServiceStartDate?: Date | null;
  careerStartDate?: Date | null;
  administrativeProcessAnalysis?: string | null;
  teacherRetirementPlanningResult?: TeacherRetirementPlanningRppsResultEntity | null;
}
