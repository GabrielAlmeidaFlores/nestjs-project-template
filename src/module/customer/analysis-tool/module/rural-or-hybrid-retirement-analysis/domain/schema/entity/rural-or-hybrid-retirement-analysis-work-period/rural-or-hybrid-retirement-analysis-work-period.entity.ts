import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RuralOrHybridRetirementAnalysisWorkPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period/value-object/rural-or-hybrid-retirement-analysis-work-period-id.value-object';

import type { RuralOrHybridRetirementAnalysisId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/value-object/rural-or-hybrid-retirement-analysis-id.value-object';
import type { RuralOrHybridRetirementAnalysisWorkPeriodJobTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period/enum/rural-or-hybrid-retirement-analysis-work-period-job-type.enum';
import type { RuralOrHybridRetirementAnalysisWorkPeriodEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period/rural-or-hybrid-retirement-analysis-work-period.entity.props.interface';

export class RuralOrHybridRetirementAnalysisWorkPeriodEntity extends BaseEntity<RuralOrHybridRetirementAnalysisWorkPeriodId> {
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
  public readonly jobType: RuralOrHybridRetirementAnalysisWorkPeriodJobTypeEnum | null;
  public readonly activityDescription: string | null;
  public readonly ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId;

  protected readonly _type =
    RuralOrHybridRetirementAnalysisWorkPeriodEntity.name;

  public constructor(
    props: RuralOrHybridRetirementAnalysisWorkPeriodEntityPropsInterface,
  ) {
    super(RuralOrHybridRetirementAnalysisWorkPeriodId, props);
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
    this.ruralOrHybridRetirementAnalysisId =
      props.ruralOrHybridRetirementAnalysisId;
  }
}
