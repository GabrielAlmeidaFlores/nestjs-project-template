import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TeacherRetirementPlanningRppsEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning/teacher-retirement-planning.entity';
import type { TeacherRetirementPlanningRppsPeriodServiceTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period/enum/teacher-retirement-planning-period-service-type.enum';
import type { TeacherRetirementPlanningRppsPeriodId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period/value-object/teacher-retirement-planning-period-id.value-object';

export interface TeacherRetirementPlanningRppsPeriodEntityPropsInterface extends BaseEntityPropsInterface<TeacherRetirementPlanningRppsPeriodId> {
  startDate: Date;
  endDate?: Date | null;
  positionName?: string | null;
  careerName?: string | null;
  serviceType?: TeacherRetirementPlanningRppsPeriodServiceTypeEnum | null;
  department?: string | null;
  teacherRetirementPlanning: TeacherRetirementPlanningRppsEntity;
}
