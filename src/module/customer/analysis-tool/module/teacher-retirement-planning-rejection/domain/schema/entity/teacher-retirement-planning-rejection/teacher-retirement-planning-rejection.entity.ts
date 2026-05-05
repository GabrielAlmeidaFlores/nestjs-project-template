import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TeacherRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/value-object/teacher-retirement-planning-rejection-id.value-object';

import type { TeacherRetirementPlanningRejectionActivityTypeEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/enum/teacher-retirement-planning-rejection-activity-type.enum';
import type { TeacherRetirementPlanningRejectionCategoryEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/enum/teacher-retirement-planning-rejection-category.enum';
import type { TeacherRetirementPlanningRejectionDenialReasonEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/enum/teacher-retirement-planning-rejection-denial-reason.enum';
import type { TeacherRetirementPlanningRejectionEntityPropsInterface } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/teacher-retirement-planning-rejection.entity.props.interface';
import type { TeacherRetirementPlanningRejectionResultId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-result/value-object/teacher-retirement-planning-rejection-result-id.value-object';

export class TeacherRetirementPlanningRejectionEntity extends BaseEntity<TeacherRetirementPlanningRejectionId> {
  public readonly analysisName: string | null;
  public readonly requestEntryDate: Date | null;
  public readonly denialDate: Date | null;
  public readonly category: TeacherRetirementPlanningRejectionCategoryEnum | null;
  public readonly activityType: TeacherRetirementPlanningRejectionActivityTypeEnum | null;
  public readonly activityTypeDescription: string | null;
  public readonly denialReason: TeacherRetirementPlanningRejectionDenialReasonEnum | null;
  public readonly denialReasonDescription: string | null;
  public readonly teacherRetirementPlanningRejectionResultId: TeacherRetirementPlanningRejectionResultId | null;

  protected readonly _type = TeacherRetirementPlanningRejectionEntity.name;

  public constructor(
    props: TeacherRetirementPlanningRejectionEntityPropsInterface,
  ) {
    super(TeacherRetirementPlanningRejectionId, props);
    this.analysisName = props.analysisName ?? null;
    this.requestEntryDate = props.requestEntryDate ?? null;
    this.denialDate = props.denialDate ?? null;
    this.category = props.category ?? null;
    this.activityType = props.activityType ?? null;
    this.activityTypeDescription = props.activityTypeDescription ?? null;
    this.denialReason = props.denialReason ?? null;
    this.denialReasonDescription = props.denialReasonDescription ?? null;
    this.teacherRetirementPlanningRejectionResultId =
      props.teacherRetirementPlanningRejectionResultId ?? null;
  }
}
