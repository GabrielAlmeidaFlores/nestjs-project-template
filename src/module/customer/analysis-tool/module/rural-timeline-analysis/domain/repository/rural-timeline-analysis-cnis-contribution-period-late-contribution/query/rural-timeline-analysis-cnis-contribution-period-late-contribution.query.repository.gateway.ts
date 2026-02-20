import type { RuralTimelineAnalysisCnisContributionPeriodLateContributionEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-late-contribution/rural-timeline-analysis-cnis-contribution-period-late-contribution.entity';
import type { RuralTimelineAnalysisCnisContributionPeriodLateContributionId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-late-contribution/value-object/rural-timeline-analysis-cnis-contribution-period-late-contribution-id/rural-timeline-analysis-cnis-contribution-period-late-contribution-id.value-object';

export abstract class RuralTimelineAnalysisCnisContributionPeriodLateContributionQueryRepositoryGateway {
  public abstract findOneById(
    id: RuralTimelineAnalysisCnisContributionPeriodLateContributionId,
  ): Promise<RuralTimelineAnalysisCnisContributionPeriodLateContributionEntity | null>;
}
