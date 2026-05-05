import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TeacherRetirementPlanningRejectionTeachingPeriodDocumentId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-teaching-period-document/value-object/teacher-retirement-planning-rejection-teaching-period-document-id.value-object';

import type { TeacherRetirementPlanningRejectionTeachingPeriodId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-teaching-period/value-object/teacher-retirement-planning-rejection-teaching-period-id.value-object';
import type { TeacherRetirementPlanningRejectionTeachingPeriodDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-teaching-period-document/teacher-retirement-planning-rejection-teaching-period-document.entity.props.interface';

export class TeacherRetirementPlanningRejectionTeachingPeriodDocumentEntity extends BaseEntity<TeacherRetirementPlanningRejectionTeachingPeriodDocumentId> {
  public readonly fileName: string;
  public readonly teacherRetirementPlanningRejectionTeachingPeriodId: TeacherRetirementPlanningRejectionTeachingPeriodId;

  protected readonly _type =
    TeacherRetirementPlanningRejectionTeachingPeriodDocumentEntity.name;

  public constructor(
    props: TeacherRetirementPlanningRejectionTeachingPeriodDocumentEntityPropsInterface,
  ) {
    super(TeacherRetirementPlanningRejectionTeachingPeriodDocumentId, props);
    this.fileName = props.fileName;
    this.teacherRetirementPlanningRejectionTeachingPeriodId =
      props.teacherRetirementPlanningRejectionTeachingPeriodId;
  }
}
