import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TeacherRetirementPlanningDocumentId } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-document/value-object/teacher-retirement-planning-document-id.value-object';

import type { TeacherRetirementPlanningEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning/teacher-retirement-planning.entity';
import type { TeacherRetirementPlanningDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/teacher-retirement-planning/domain/schema/entity/teacher-retirement-planning-document/teacher-retirement-planning-document.entity.props.interface';

export class TeacherRetirementPlanningDocumentEntity extends BaseEntity<TeacherRetirementPlanningDocumentId> {
  public readonly document: string;
  public readonly teacherRetirementPlanning: TeacherRetirementPlanningEntity;

  protected readonly _type = TeacherRetirementPlanningDocumentEntity.name;

  public constructor(
    props: TeacherRetirementPlanningDocumentEntityPropsInterface,
  ) {
    super(TeacherRetirementPlanningDocumentId, props);
    this.document = props.document;
    this.teacherRetirementPlanning = props.teacherRetirementPlanning;
  }
}
