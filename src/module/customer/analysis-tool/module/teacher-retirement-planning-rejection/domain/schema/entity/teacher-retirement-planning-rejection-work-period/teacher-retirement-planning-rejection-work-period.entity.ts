import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TeacherRetirementPlanningRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-work-period/value-object/teacher-retirement-planning-rejection-work-period-id.value-object';

import type { TeacherRetirementPlanningRejectionId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection/value-object/teacher-retirement-planning-rejection-id.value-object';
import type { TeacherRetirementPlanningRejectionWorkPeriodTimelineClassificationEnum } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-work-period/enum/teacher-retirement-planning-rejection-work-period-timeline-classification.enum';
import type { TeacherRetirementPlanningRejectionWorkPeriodEntityPropsInterface } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-work-period/teacher-retirement-planning-rejection-work-period.entity.props.interface';

export class TeacherRetirementPlanningRejectionWorkPeriodEntity extends BaseEntity<TeacherRetirementPlanningRejectionWorkPeriodId> {
  public readonly bondOrigin: string | null;
  public readonly startDate: Date | null;
  public readonly endDate: Date | null;
  public readonly category: string | null;
  public readonly activityDescription: string | null;
  public readonly competenceBelowTheMinimum: boolean | null;
  public readonly pendencyReason: string | null;
  public readonly periodConsideration: string | null;
  public readonly contributionAverage: string | null;
  public readonly status: string | null;
  public readonly gracePeriod: string | null;
  public readonly impactMonths: string | null;
  public readonly isPendency: boolean | null;
  public readonly wantsToComplementViaMeuINSS: boolean | null;
  public readonly hasSpecialPeriod: boolean | null;
  public readonly timelineClassification: TeacherRetirementPlanningRejectionWorkPeriodTimelineClassificationEnum | null;
  public readonly teacherRetirementPlanningRejectionId: TeacherRetirementPlanningRejectionId;

  protected readonly _type =
    TeacherRetirementPlanningRejectionWorkPeriodEntity.name;

  public constructor(
    props: TeacherRetirementPlanningRejectionWorkPeriodEntityPropsInterface,
  ) {
    super(TeacherRetirementPlanningRejectionWorkPeriodId, props);
    this.bondOrigin = props.bondOrigin ?? null;
    this.startDate = props.startDate ?? null;
    this.endDate = props.endDate ?? null;
    this.category = props.category ?? null;
    this.activityDescription = props.activityDescription ?? null;
    this.competenceBelowTheMinimum = props.competenceBelowTheMinimum ?? null;
    this.pendencyReason = props.pendencyReason ?? null;
    this.periodConsideration = props.periodConsideration ?? null;
    this.contributionAverage = props.contributionAverage ?? null;
    this.status = props.status ?? null;
    this.gracePeriod = props.gracePeriod ?? null;
    this.impactMonths = props.impactMonths ?? null;
    this.isPendency = props.isPendency ?? null;
    this.wantsToComplementViaMeuINSS =
      props.wantsToComplementViaMeuINSS ?? null;
    this.hasSpecialPeriod = props.hasSpecialPeriod ?? null;
    this.timelineClassification = props.timelineClassification ?? null;
    this.teacherRetirementPlanningRejectionId =
      props.teacherRetirementPlanningRejectionId;
  }
}
