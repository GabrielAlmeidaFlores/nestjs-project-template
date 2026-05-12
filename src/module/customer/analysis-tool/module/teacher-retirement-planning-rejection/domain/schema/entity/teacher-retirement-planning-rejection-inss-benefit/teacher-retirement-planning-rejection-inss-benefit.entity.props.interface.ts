import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TeacherRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/value-object/teacher-retirement-planning-rejection-id.value-object';
import type { TeacherRetirementPlanningRejectionInssBenefitId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-inss-benefit/value-object/teacher-retirement-planning-rejection-inss-benefit-id.value-object';

export interface TeacherRetirementPlanningRejectionInssBenefitEntityPropsInterface extends BaseEntityPropsInterface<TeacherRetirementPlanningRejectionInssBenefitId> {
  inssBenefit?: string | null;
  teacherRetirementPlanningRejectionId: TeacherRetirementPlanningRejectionId;
}
