import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';
import type { RuralTimelineAnalysisCnisContributionPeriodAdjustmentId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-adjustment/value-object/rural-timeline-analysis-cnis-contribution-period-adjustment-id/rural-timeline-analysis-cnis-contribution-period-adjustment-id.value-object';

export interface RuralTimelineAnalysisCnisContributionPeriodAdjustmentEntityPropsInterface
  extends BaseEntityPropsInterface<RuralTimelineAnalysisCnisContributionPeriodAdjustmentId> {
  technicalObservation: string;
  contributionTimeGainedYears: number;
  contributionTimeGainedMonths: number;
  contributionTimeGainedDays: number;
  conventionalPeriodStartDate: Date;
  conventionalPeriodEndDate: Date;
  ruralTimelineCnisContributionPeriodId: RuralTimelineAnalysisCnisContributionPeriodId;
}
