import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';
import type { RuralTimelineAnalysisCnisContributionPeriodLateContributionEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-late-contribution/rural-timeline-analysis-cnis-contribution-period-late-contribution.entity';
import type { RuralTimelineAnalysisCnisContributionPeriodLateContributionId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-late-contribution/value-object/rural-timeline-analysis-cnis-contribution-period-late-contribution-id/rural-timeline-analysis-cnis-contribution-period-late-contribution-id.value-object';

export abstract class RuralTimelineAnalysisCnisContributionPeriodLateContributionCommandRepositoryGateway {
  public abstract createRuralTimelineAnalysisCnisContributionPeriodLateContribution(
    props: RuralTimelineAnalysisCnisContributionPeriodLateContributionEntity,
  ): TransactionType;

  public abstract updateRuralTimelineAnalysisCnisContributionPeriodLateContribution(
    props: RuralTimelineAnalysisCnisContributionPeriodLateContributionEntity,
  ): TransactionType;

  public abstract deleteRuralTimelineAnalysisCnisContributionPeriodLateContribution(
    id: RuralTimelineAnalysisCnisContributionPeriodLateContributionId,
  ): TransactionType;

  public abstract deleteAllByContributionPeriodId(
    contributionPeriodId: RuralTimelineAnalysisCnisContributionPeriodId,
  ): TransactionType;
}
