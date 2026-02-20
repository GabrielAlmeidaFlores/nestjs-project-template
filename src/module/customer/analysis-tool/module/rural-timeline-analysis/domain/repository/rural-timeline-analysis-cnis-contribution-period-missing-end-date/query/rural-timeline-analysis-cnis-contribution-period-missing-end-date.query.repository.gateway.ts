import type { RuralTimelineAnalysisCnisContributionPeriodMissingEndDateEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-missing-end-date/rural-timeline-analysis-cnis-contribution-period-missing-end-date.entity';
import type { RuralTimelineAnalysisCnisContributionPeriodMissingEndDateId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-missing-end-date/value-object/rural-timeline-analysis-cnis-contribution-period-missing-end-date-id/rural-timeline-analysis-cnis-contribution-period-missing-end-date-id.value-object';

export abstract class RuralTimelineAnalysisCnisContributionPeriodMissingEndDateQueryRepositoryGateway {
  public abstract findOneById(
    id: RuralTimelineAnalysisCnisContributionPeriodMissingEndDateId,
  ): Promise<RuralTimelineAnalysisCnisContributionPeriodMissingEndDateEntity | null>;
}
