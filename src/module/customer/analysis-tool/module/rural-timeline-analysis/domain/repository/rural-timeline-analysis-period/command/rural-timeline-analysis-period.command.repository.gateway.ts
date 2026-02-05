import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RuralTimelineAnalysisPeriodEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/rural-timeline-analysis-period.entity';
import type { RuralTimelineAnalysisPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/value-object/rural-timeline-analysis-period-id/rural-timeline-analysis-period-id.value-object';

export abstract class RuralTimelineAnalysisPeriodCommandRepositoryGateway {
  public abstract createRuralTimelineAnalysisPeriod(
    props: RuralTimelineAnalysisPeriodEntity,
  ): TransactionType;

  public abstract deleteRuralTimelineAnalysisPeriod(
    id: RuralTimelineAnalysisPeriodId,
  ): TransactionType;
}
