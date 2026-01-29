import type { RuralTimelineAnalysisCnisContributionPeriodEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/rural-timeline-analysis-cnis-contribution-period.entity';
import type { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';

export abstract class RuralTimelineAnalysisCnisContributionPeriodQueryRepositoryGateway {
  public abstract findOneById(
    id: RuralTimelineAnalysisCnisContributionPeriodId,
  ): Promise<RuralTimelineAnalysisCnisContributionPeriodEntity | null>;
}
