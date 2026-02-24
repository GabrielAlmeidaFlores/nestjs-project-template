import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { TeacherRetirementPlanningRemunerationId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-remuneration/value-object/teacher-retirement-planning-remuneration-id.value-object';
import type { TeacherRetirementPlanningEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/teacher-retirement-planning.entity';

export interface TeacherRetirementPlanningRemunerationEntityPropsInterface
  extends BaseEntityPropsInterface<TeacherRetirementPlanningRemunerationId> {
  contributionDate: Date;
  amount: DecimalValue;
  teacherRetirementPlanning: TeacherRetirementPlanningEntity;
}
