import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TeacherRetirementPlanningRejectionWorkPeriodDocumentId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-work-period-document/value-object/teacher-retirement-planning-rejection-work-period-document-id.value-object';

import type { TeacherRetirementPlanningRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-work-period/value-object/teacher-retirement-planning-rejection-work-period-id.value-object';
import type { TeacherRetirementPlanningRejectionWorkPeriodDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-work-period-document/teacher-retirement-planning-rejection-work-period-document.entity.props.interface';

export class TeacherRetirementPlanningRejectionWorkPeriodDocumentEntity extends BaseEntity<TeacherRetirementPlanningRejectionWorkPeriodDocumentId> {
  public readonly fileName: string;
  public readonly teacherRetirementPlanningRejectionWorkPeriodId: TeacherRetirementPlanningRejectionWorkPeriodId;

  protected readonly _type =
    TeacherRetirementPlanningRejectionWorkPeriodDocumentEntity.name;

  public constructor(
    props: TeacherRetirementPlanningRejectionWorkPeriodDocumentEntityPropsInterface,
  ) {
    super(TeacherRetirementPlanningRejectionWorkPeriodDocumentId, props);
    this.fileName = props.fileName;
    this.teacherRetirementPlanningRejectionWorkPeriodId =
      props.teacherRetirementPlanningRejectionWorkPeriodId;
  }
}
