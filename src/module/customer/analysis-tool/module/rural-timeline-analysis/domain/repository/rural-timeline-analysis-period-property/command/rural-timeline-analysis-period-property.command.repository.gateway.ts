import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RuralTimelineAnalysisPeriodPropertyEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-property/rural-timeline-analysis-period-property.entity';
import type { RuralTimelineAnalysisPeriodPropertyId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-property/value-object/rural-timeline-analysis-period-property-id/rural-timeline-analysis-period-property-id.value-object';

export abstract class RuralTimelineAnalysisPeriodPropertyCommandRepositoryGateway {
  public abstract createRuralTimelineAnalysisPeriodProperty(
    props: RuralTimelineAnalysisPeriodPropertyEntity,
  ): TransactionType;

  public abstract deleteRuralTimelineAnalysisPeriodProperty(
    id: RuralTimelineAnalysisPeriodPropertyId,
  ): TransactionType;
}
