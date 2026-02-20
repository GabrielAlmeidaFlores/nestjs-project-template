import type { RuralTimelineAnalysisPeriodPendingExitDateEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-pending-exit-date/rural-timeline-analysis-period-pending-exit-date.entity';
import type { RuralTimelineAnalysisPeriodPendingExitDateId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-pending-exit-date/value-object/rural-timeline-analysis-period-pending-exit-date-id/rural-timeline-analysis-period-pending-exit-date-id.value-object';

export abstract class RuralTimelineAnalysisPeriodPendingExitDateQueryRepositoryGateway {
  public abstract findOneById(
    id: RuralTimelineAnalysisPeriodPendingExitDateId,
  ): Promise<RuralTimelineAnalysisPeriodPendingExitDateEntity | null>;
}
