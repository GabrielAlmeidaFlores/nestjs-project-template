import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import type { TeacherRetirementPlanningActivityTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/enum/teacher-retirement-planning-activity-type.enum';
import type { TeacherRetirementPlanningFederativeEntityEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/enum/teacher-retirement-planning-federative-entity.enum';
import type { TeacherRetirementPlanningId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/value-object/teacher-retirement-planning-id.value-object';
import type { TeacherRetirementPlanningResultEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-result/teacher-retirement-planning-result.entity';

export interface TeacherRetirementPlanningEntityPropsInterface extends BaseEntityPropsInterface<TeacherRetirementPlanningId> {
  federativeEntity: TeacherRetirementPlanningFederativeEntityEnum;
  state?: StateCodeEnum | null;
  municipality?: string | null;
  analysisName?: string | null;
  currentPosition?: string | null;
  activityType: TeacherRetirementPlanningActivityTypeEnum;
  publicServiceStartDate: Date;
  careerStartDate: Date;
  administrativeProcessAnalysis?: string | null;
  teacherRetirementPlanningResult?: TeacherRetirementPlanningResultEntity | null;
}
