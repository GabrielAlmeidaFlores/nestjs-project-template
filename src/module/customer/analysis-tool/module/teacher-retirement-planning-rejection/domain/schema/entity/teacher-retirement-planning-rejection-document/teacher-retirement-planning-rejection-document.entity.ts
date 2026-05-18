import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TeacherRetirementPlanningRejectionDocumentId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-document/value-object/teacher-retirement-planning-rejection-document-id.value-object';

import type { TeacherRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/value-object/teacher-retirement-planning-rejection-id.value-object';
import type { TeacherRetirementPlanningRejectionDocumentTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-document/enum/teacher-retirement-planning-rejection-document-type.enum';
import type { TeacherRetirementPlanningRejectionDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-document/teacher-retirement-planning-rejection-document.entity.props.interface';

export class TeacherRetirementPlanningRejectionDocumentEntity extends BaseEntity<TeacherRetirementPlanningRejectionDocumentId> {
  public readonly fileName: string;
  public readonly name: string;
  public readonly type: TeacherRetirementPlanningRejectionDocumentTypeEnum;
  public readonly teacherRetirementPlanningRejectionId: TeacherRetirementPlanningRejectionId;

  protected readonly _type =
    TeacherRetirementPlanningRejectionDocumentEntity.name;

  public constructor(
    props: TeacherRetirementPlanningRejectionDocumentEntityPropsInterface,
  ) {
    super(TeacherRetirementPlanningRejectionDocumentId, props);
    this.fileName = props.fileName;
    this.name = props.name;
    this.type = props.type;
    this.teacherRetirementPlanningRejectionId =
      props.teacherRetirementPlanningRejectionId;
  }
}
