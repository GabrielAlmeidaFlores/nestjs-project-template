import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { TeacherRetirementPlanningRppsPeriodItemEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period-item/teacher-retirement-planning-period-item.entity';
import type { TeacherRetirementPlanningRppsPeriodItemDocumentId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period-item-document/value-object/teacher-retirement-planning-period-item-document-id.value-object';

export interface TeacherRetirementPlanningRppsPeriodItemDocumentEntityPropsInterface extends BaseEntityPropsInterface<TeacherRetirementPlanningRppsPeriodItemDocumentId> {
  document: string;
  teacherRetirementPlanningPeriodItem: TeacherRetirementPlanningRppsPeriodItemEntity;
}
