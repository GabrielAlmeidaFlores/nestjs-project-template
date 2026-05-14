import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TeacherRetirementPlanningRppsEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning/teacher-retirement-planning.entity';
import type { TeacherRetirementPlanningRppsLegalProceedingId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-legal-proceeding/value-object/teacher-retirement-planning-legal-proceeding-id.value-object';

export interface TeacherRetirementPlanningRppsLegalProceedingEntityPropsInterface extends BaseEntityPropsInterface<TeacherRetirementPlanningRppsLegalProceedingId> {
  legalProceedingNumber: string;
  teacherRetirementPlanning: TeacherRetirementPlanningRppsEntity;
}
