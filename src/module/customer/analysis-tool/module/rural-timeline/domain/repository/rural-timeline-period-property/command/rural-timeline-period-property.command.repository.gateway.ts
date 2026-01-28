import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RuralTimelinePeriodPropertyEntity } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-property/rural-timeline-period-property.entity';
import type { RuralTimelinePeriodPropertyId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-property/value-object/rural-timeline-period-property-id/rural-timeline-period-property-id.value-object';

export abstract class RuralTimelinePeriodPropertyCommandRepositoryGateway {
  public abstract createRuralTimelinePeriodProperty(
    props: RuralTimelinePeriodPropertyEntity,
  ): TransactionType;

  public abstract deleteRuralTimelinePeriodProperty(
    id: RuralTimelinePeriodPropertyId,
  ): TransactionType;
}
