import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TeacherRetirementPlanningEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/teacher-retirement-planning.entity';
import type { TeacherRetirementPlanningPeriodServiceTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period/enum/teacher-retirement-planning-period-service-type.enum';
import type { TeacherRetirementPlanningPeriodId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period/value-object/teacher-retirement-planning-period-id.value-object';

export interface TeacherRetirementPlanningPeriodEntityPropsInterface extends BaseEntityPropsInterface<TeacherRetirementPlanningPeriodId> {
  startDate: Date;
  endDate: Date;
  positionName: string;
  careerName: string;
  serviceType: TeacherRetirementPlanningPeriodServiceTypeEnum;
  department: string;
  teacherRetirementPlanning: TeacherRetirementPlanningEntity;
}
