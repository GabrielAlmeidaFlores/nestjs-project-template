import type { RuralTimelineCnisContributionPeriodOverdueContributionEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-cnis-contribution-period-overdue-contribution/rural-timeline-cnis-contribution-period-overdue-contribution.entity';
import type { RuralTimelineCnisContributionPeriodOverdueContributionId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-cnis-contribution-period-overdue-contribution/value-object/rural-timeline-cnis-contribution-period-overdue-contribution-id/rural-timeline-cnis-contribution-period-overdue-contribution-id.value-object';

export abstract class RuralTimelineCnisContributionPeriodOverdueContributionQueryRepositoryGateway {
  public abstract findOneById(
    id: RuralTimelineCnisContributionPeriodOverdueContributionId,
  ): Promise<RuralTimelineCnisContributionPeriodOverdueContributionEntity | null>;
}
