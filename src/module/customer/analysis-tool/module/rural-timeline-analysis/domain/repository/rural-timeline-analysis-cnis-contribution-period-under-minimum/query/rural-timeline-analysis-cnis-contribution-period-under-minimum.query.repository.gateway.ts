import type { RuralTimelineAnalysisCnisContributionPeriodUnderMinimumEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-under-minimum/rural-timeline-analysis-cnis-contribution-period-under-minimum.entity';
import type { RuralTimelineAnalysisCnisContributionPeriodUnderMinimumId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-under-minimum/value-object/rural-timeline-analysis-cnis-contribution-period-under-minimum-id/rural-timeline-analysis-cnis-contribution-period-under-minimum-id.value-object';

export abstract class RuralTimelineAnalysisCnisContributionPeriodUnderMinimumQueryRepositoryGateway {
  public abstract findOneById(
    id: RuralTimelineAnalysisCnisContributionPeriodUnderMinimumId,
  ): Promise<RuralTimelineAnalysisCnisContributionPeriodUnderMinimumEntity | null>;
}
