import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TeacherRetirementPlanningRppsEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning/teacher-retirement-planning.entity';
import type { TeacherRetirementPlanningRppsInssBenefitId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-inss-benefit/value-object/teacher-retirement-planning-inss-benefit-id.value-object';

export interface TeacherRetirementPlanningRppsInssBenefitEntityPropsInterface extends BaseEntityPropsInterface<TeacherRetirementPlanningRppsInssBenefitId> {
  inssBenefitNumber: string;
  teacherRetirementPlanning: TeacherRetirementPlanningRppsEntity;
}
