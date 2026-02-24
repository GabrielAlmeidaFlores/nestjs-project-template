import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TeacherRetirementPlanningPeriodItemDocumentId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item-document/value-object/teacher-retirement-planning-period-item-document-id.value-object';

import type { TeacherRetirementPlanningPeriodItemDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item-document/teacher-retirement-planning-period-item-document.entity.props.interface';
import type { TeacherRetirementPlanningPeriodItemEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-period-item/teacher-retirement-planning-period-item.entity';

export class TeacherRetirementPlanningPeriodItemDocumentEntity extends BaseEntity<TeacherRetirementPlanningPeriodItemDocumentId> {
  public readonly document: string;
  public readonly teacherRetirementPlanningPeriodItem: TeacherRetirementPlanningPeriodItemEntity;

  protected readonly _type =
    TeacherRetirementPlanningPeriodItemDocumentEntity.name;

  public constructor(
    props: TeacherRetirementPlanningPeriodItemDocumentEntityPropsInterface,
  ) {
    super(TeacherRetirementPlanningPeriodItemDocumentId, props);
    this.document = props.document;
    this.teacherRetirementPlanningPeriodItem =
      props.teacherRetirementPlanningPeriodItem;
  }
}
