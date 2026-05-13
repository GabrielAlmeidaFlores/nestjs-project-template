import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TeacherRetirementPlanningRppsDocumentId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-document/value-object/teacher-retirement-planning-document-id.value-object';

import type { TeacherRetirementPlanningRppsEntity } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning/teacher-retirement-planning.entity';
import type { TeacherRetirementPlanningRppsDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rpps/domain/schema/entity/teacher-retirement-planning-document/teacher-retirement-planning-document.entity.props.interface';

export class TeacherRetirementPlanningRppsDocumentEntity extends BaseEntity<TeacherRetirementPlanningRppsDocumentId> {
  public readonly document: string;
  public readonly teacherRetirementPlanning: TeacherRetirementPlanningRppsEntity;

  protected readonly _type = TeacherRetirementPlanningRppsDocumentEntity.name;

  public constructor(
    props: TeacherRetirementPlanningRppsDocumentEntityPropsInterface,
  ) {
    super(TeacherRetirementPlanningRppsDocumentId, props);
    this.document = props.document;
    this.teacherRetirementPlanning = props.teacherRetirementPlanning;
  }
}
