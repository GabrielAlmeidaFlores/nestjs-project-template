import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RuralTimelineAnalysisEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/rural-timeline-analysis.entity';
import type { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';

export abstract class RuralTimelineAnalysisCommandRepositoryGateway {
  public abstract createRuralTimeline(
    props: RuralTimelineAnalysisEntity,
  ): TransactionType;

  public abstract updateRuralTimeline(
    props: RuralTimelineAnalysisEntity,
  ): TransactionType;

  public abstract deleteRuralTimeline(
    id: RuralTimelineAnalysisId,
  ): TransactionType;
}
