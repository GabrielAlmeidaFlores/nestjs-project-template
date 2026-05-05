import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-work-period-earnings-history/value-object/teacher-retirement-planning-rejection-work-period-earnings-history-id.value-object';

import type { TeacherRetirementPlanningRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-work-period/value-object/teacher-retirement-planning-rejection-work-period-id.value-object';
import type { TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryEntityPropsInterface } from '@module/customer/analysis-tool/module/teacher-retirement-planning-rejection/domain/schema/entity/teacher-retirement-planning-rejection-work-period-earnings-history/teacher-retirement-planning-rejection-work-period-earnings-history.entity.props.interface';

export class TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryEntity extends BaseEntity<TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryId> {
  public readonly competence: string | null;
  public readonly remuneration: string | null;
  public readonly indicators: string | null;
  public readonly paymentDate: Date | null;
  public readonly contribution: string | null;
  public readonly contributionSalary: string | null;
  public readonly competenceBelowMinimum: boolean | null;
  public readonly teacherRetirementPlanningRejectionWorkPeriodId: TeacherRetirementPlanningRejectionWorkPeriodId;

  protected readonly _type =
    TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryEntity.name;

  public constructor(
    props: TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryEntityPropsInterface,
  ) {
    super(TeacherRetirementPlanningRejectionWorkPeriodEarningsHistoryId, props);
    this.competence = props.competence ?? null;
    this.remuneration = props.remuneration ?? null;
    this.indicators = props.indicators ?? null;
    this.paymentDate = props.paymentDate ?? null;
    this.contribution = props.contribution ?? null;
    this.contributionSalary = props.contributionSalary ?? null;
    this.competenceBelowMinimum = props.competenceBelowMinimum ?? null;
    this.teacherRetirementPlanningRejectionWorkPeriodId =
      props.teacherRetirementPlanningRejectionWorkPeriodId;
  }
}
