import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';
import type { RuralTimelineCnisContributionPeriodOverdueContributionEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-cnis-contribution-period-overdue-contribution/rural-timeline-cnis-contribution-period-overdue-contribution.entity';
import type { RuralTimelineCnisContributionPeriodOverdueContributionId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-cnis-contribution-period-overdue-contribution/value-object/rural-timeline-cnis-contribution-period-overdue-contribution-id/rural-timeline-cnis-contribution-period-overdue-contribution-id.value-object';

export abstract class RuralTimelineCnisContributionPeriodOverdueContributionCommandRepositoryGateway {
  public abstract createRuralTimelineCnisContributionPeriodOverdueContribution(
    props: RuralTimelineCnisContributionPeriodOverdueContributionEntity,
  ): TransactionType;

  public abstract updateRuralTimelineCnisContributionPeriodOverdueContribution(
    props: RuralTimelineCnisContributionPeriodOverdueContributionEntity,
  ): TransactionType;

  public abstract deleteRuralTimelineCnisContributionPeriodOverdueContribution(
    id: RuralTimelineCnisContributionPeriodOverdueContributionId,
  ): TransactionType;

  public abstract deleteAllByContributionPeriodId(
    contributionPeriodId: RuralTimelineAnalysisCnisContributionPeriodId,
  ): TransactionType;
}
