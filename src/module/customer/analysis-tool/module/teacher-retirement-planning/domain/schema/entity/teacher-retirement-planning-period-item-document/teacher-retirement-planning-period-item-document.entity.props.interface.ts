import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TeacherRetirementPlanningPeriodItemDocumentId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item-document/value-object/teacher-retirement-planning-period-item-document-id.value-object';
import type { TeacherRetirementPlanningPeriodItemEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item/teacher-retirement-planning-period-item.entity';

export interface TeacherRetirementPlanningPeriodItemDocumentEntityPropsInterface
  extends BaseEntityPropsInterface<TeacherRetirementPlanningPeriodItemDocumentId> {
  document: string;
  teacherRetirementPlanningPeriodItem: TeacherRetirementPlanningPeriodItemEntity;
}
