import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TeacherRetirementPlanningRppsPeriodItemDocumentId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period-item-document/value-object/teacher-retirement-planning-period-item-document-id.value-object';

import type { TeacherRetirementPlanningRppsPeriodItemEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period-item/teacher-retirement-planning-period-item.entity';
import type { TeacherRetirementPlanningRppsPeriodItemDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-period-item-document/teacher-retirement-planning-period-item-document.entity.props.interface';

export class TeacherRetirementPlanningRppsPeriodItemDocumentEntity extends BaseEntity<TeacherRetirementPlanningRppsPeriodItemDocumentId> {
  public readonly document: string;
  public readonly teacherRetirementPlanningPeriodItem: TeacherRetirementPlanningRppsPeriodItemEntity;

  protected readonly _type =
    TeacherRetirementPlanningRppsPeriodItemDocumentEntity.name;

  public constructor(
    props: TeacherRetirementPlanningRppsPeriodItemDocumentEntityPropsInterface,
  ) {
    super(TeacherRetirementPlanningRppsPeriodItemDocumentId, props);
    this.document = props.document;
    this.teacherRetirementPlanningPeriodItem =
      props.teacherRetirementPlanningPeriodItem;
  }
}
