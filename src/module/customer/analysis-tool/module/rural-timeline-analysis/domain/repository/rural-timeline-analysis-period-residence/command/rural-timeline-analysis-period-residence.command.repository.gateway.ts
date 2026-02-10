import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RuralTimelineAnalysisPeriodResidenceEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-residence/rural-timeline-analysis-period-residence.entity';
import type { RuralTimelineAnalysisPeriodResidenceId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-residence/value-object/rural-timeline-analysis-period-residence-id/rural-timeline-analysis-period-residence-id.value-object';

export abstract class RuralTimelineAnalysisPeriodResidenceCommandRepositoryGateway {
  public abstract createRuralTimelineAnalysisPeriodResidence(
    props: RuralTimelineAnalysisPeriodResidenceEntity,
  ): TransactionType;

  public abstract deleteRuralTimelineAnalysisPeriodResidence(
    id: RuralTimelineAnalysisPeriodResidenceId,
  ): TransactionType;
}
