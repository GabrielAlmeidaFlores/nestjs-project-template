import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { TeacherRetirementPlanningRppsEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning/teacher-retirement-planning.entity';
import type { TeacherRetirementPlanningRppsRemunerationId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-remuneration/value-object/teacher-retirement-planning-remuneration-id.value-object';

export interface TeacherRetirementPlanningRppsRemunerationEntityPropsInterface extends BaseEntityPropsInterface<TeacherRetirementPlanningRppsRemunerationId> {
  contributionDate: Date;
  amount: DecimalValue;
  teacherRetirementPlanning: TeacherRetirementPlanningRppsEntity;
}
