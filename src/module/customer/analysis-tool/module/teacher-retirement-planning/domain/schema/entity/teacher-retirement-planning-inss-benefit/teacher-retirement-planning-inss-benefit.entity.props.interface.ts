import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TeacherRetirementPlanningEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/teacher-retirement-planning.entity';
import type { TeacherRetirementPlanningInssBenefitId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-inss-benefit/value-object/teacher-retirement-planning-inss-benefit-id.value-object';

export interface TeacherRetirementPlanningInssBenefitEntityPropsInterface
  extends BaseEntityPropsInterface<TeacherRetirementPlanningInssBenefitId> {
  inssBenefitNumber: string;
  teacherRetirementPlanning: TeacherRetirementPlanningEntity;
}
