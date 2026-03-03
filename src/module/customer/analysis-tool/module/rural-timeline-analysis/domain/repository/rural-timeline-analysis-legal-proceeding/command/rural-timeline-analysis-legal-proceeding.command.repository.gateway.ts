import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RuralTimelineAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-legal-proceeding/rural-timeline-analysis-legal-proceeding.entity';
import type { RuralTimelineAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-legal-proceeding/value-object/rural-timeline-analysis-legal-proceeding-id/rural-timeline-analysis-legal-proceeding-id.value-object';

export abstract class RuralTimelineAnalysisLegalProceedingCommandRepositoryGateway {
  public abstract createRuralTimelineAnalysisLegalProceeding(
    props: RuralTimelineAnalysisLegalProceedingEntity,
  ): TransactionType;

  public abstract deleteRuralTimelineAnalysisLegalProceeding(
    id: RuralTimelineAnalysisLegalProceedingId,
  ): TransactionType;
}
