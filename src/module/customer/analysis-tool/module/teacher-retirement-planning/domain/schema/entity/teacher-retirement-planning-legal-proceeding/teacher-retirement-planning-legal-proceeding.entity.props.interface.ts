import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TeacherRetirementPlanningEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/teacher-retirement-planning.entity';
import type { TeacherRetirementPlanningLegalProceedingId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-legal-proceeding/value-object/teacher-retirement-planning-legal-proceeding-id.value-object';

export interface TeacherRetirementPlanningLegalProceedingEntityPropsInterface extends BaseEntityPropsInterface<TeacherRetirementPlanningLegalProceedingId> {
  legalProceedingNumber: string;
  teacherRetirementPlanning: TeacherRetirementPlanningEntity;
}
