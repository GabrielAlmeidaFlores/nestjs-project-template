import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';
import type { RuralTimelineAnalysisCnisContributionPeriodMissingEndDateEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-missing-end-date/rural-timeline-analysis-cnis-contribution-period-missing-end-date.entity';
import type { RuralTimelineAnalysisCnisContributionPeriodMissingEndDateId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-missing-end-date/value-object/rural-timeline-analysis-cnis-contribution-period-missing-end-date-id/rural-timeline-analysis-cnis-contribution-period-missing-end-date-id.value-object';

export abstract class RuralTimelineAnalysisCnisContributionPeriodMissingEndDateCommandRepositoryGateway {
  public abstract createRuralTimelineAnalysisCnisContributionPeriodMissingEndDate(
    props: RuralTimelineAnalysisCnisContributionPeriodMissingEndDateEntity,
  ): TransactionType;

  public abstract updateRuralTimelineAnalysisCnisContributionPeriodMissingEndDate(
    props: RuralTimelineAnalysisCnisContributionPeriodMissingEndDateEntity,
  ): TransactionType;

  public abstract deleteRuralTimelineAnalysisCnisContributionPeriodMissingEndDate(
    id: RuralTimelineAnalysisCnisContributionPeriodMissingEndDateId,
  ): TransactionType;

  public abstract deleteAllByContributionPeriodId(
    contributionPeriodId: RuralTimelineAnalysisCnisContributionPeriodId,
  ): TransactionType;
}
