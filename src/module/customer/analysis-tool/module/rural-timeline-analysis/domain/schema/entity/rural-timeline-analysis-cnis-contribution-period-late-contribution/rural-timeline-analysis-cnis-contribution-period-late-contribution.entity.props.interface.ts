import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';
import type { RuralTimelineAnalysisCnisContributionPeriodLateContributionId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-late-contribution/value-object/rural-timeline-analysis-cnis-contribution-period-late-contribution-id/rural-timeline-analysis-cnis-contribution-period-late-contribution-id.value-object';

export interface RuralTimelineAnalysisCnisContributionPeriodLateContributionEntityPropsInterface extends BaseEntityPropsInterface<RuralTimelineAnalysisCnisContributionPeriodLateContributionId> {
  originalContributionDate: Date;
  actualPaymentDate: Date;
  impactAnalysis: string | null;
  analyzedAt: Date | null;
  ruralTimelineAnalysisCnisContributionPeriodId: RuralTimelineAnalysisCnisContributionPeriodId;
}
