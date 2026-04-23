import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RuralOrHybridRetirementRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period/value-object/rural-or-hybrid-retirement-rejection-work-period-id.value-object';

import type { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';
import type { RuralOrHybridRetirementRejectionWorkPeriodJobTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period/enum/rural-or-hybrid-retirement-rejection-work-period-job-type.enum';
import type { RuralOrHybridRetirementRejectionWorkPeriodEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-work-period/rural-or-hybrid-retirement-rejection-work-period.entity.props.interface';

export class RuralOrHybridRetirementRejectionWorkPeriodEntity extends BaseEntity<RuralOrHybridRetirementRejectionWorkPeriodId> {
  public readonly bondOrigin: string | null;
  public readonly startDate: Date | null;
  public readonly endDate: Date | null;
  public readonly category: string | null;
  public readonly competenceBelowTheMinimum: boolean | null;
  public readonly pendencyReason: string | null;
  public readonly periodConsideration: string | null;
  public readonly contributionAverage: string | null;
  public readonly status: string | null;
  public readonly gracePeriod: string | null;
  public readonly jobType: RuralOrHybridRetirementRejectionWorkPeriodJobTypeEnum | null;
  public readonly activityDescription: string | null;
  public readonly ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId;

  protected readonly _type =
    RuralOrHybridRetirementRejectionWorkPeriodEntity.name;

  public constructor(
    props: RuralOrHybridRetirementRejectionWorkPeriodEntityPropsInterface,
  ) {
    super(RuralOrHybridRetirementRejectionWorkPeriodId, props);
    this.bondOrigin = props.bondOrigin ?? null;
    this.startDate = props.startDate ?? null;
    this.endDate = props.endDate ?? null;
    this.category = props.category ?? null;
    this.competenceBelowTheMinimum = props.competenceBelowTheMinimum ?? null;
    this.pendencyReason = props.pendencyReason ?? null;
    this.periodConsideration = props.periodConsideration ?? null;
    this.contributionAverage = props.contributionAverage ?? null;
    this.status = props.status ?? null;
    this.gracePeriod = props.gracePeriod ?? null;
    this.jobType = props.jobType ?? null;
    this.activityDescription = props.activityDescription ?? null;
    this.ruralOrHybridRetirementRejectionId =
      props.ruralOrHybridRetirementRejectionId;
  }
}
