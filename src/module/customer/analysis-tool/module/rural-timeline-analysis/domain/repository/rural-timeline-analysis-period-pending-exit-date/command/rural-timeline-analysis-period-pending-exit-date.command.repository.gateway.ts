import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';
import type { RuralTimelineAnalysisPeriodPendingExitDateEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-pending-exit-date/rural-timeline-analysis-period-pending-exit-date.entity';
import type { RuralTimelineAnalysisPeriodPendingExitDateId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-pending-exit-date/value-object/rural-timeline-analysis-period-pending-exit-date-id/rural-timeline-analysis-period-pending-exit-date-id.value-object';

export abstract class RuralTimelineAnalysisPeriodPendingExitDateCommandRepositoryGateway {
  public abstract createRuralTimelineAnalysisPeriodPendingExitDate(
    props: RuralTimelineAnalysisPeriodPendingExitDateEntity,
  ): TransactionType;

  public abstract updateRuralTimelineAnalysisPeriodPendingExitDate(
    props: RuralTimelineAnalysisPeriodPendingExitDateEntity,
  ): TransactionType;

  public abstract deleteRuralTimelineAnalysisPeriodPendingExitDate(
    id: RuralTimelineAnalysisPeriodPendingExitDateId,
  ): TransactionType;

  public abstract deleteAllByContributionPeriodId(
    contributionPeriodId: RuralTimelineAnalysisCnisContributionPeriodId,
  ): TransactionType;
}
