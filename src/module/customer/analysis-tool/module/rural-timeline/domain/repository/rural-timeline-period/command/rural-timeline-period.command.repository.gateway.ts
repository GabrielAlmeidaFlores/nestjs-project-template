import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RuralTimelinePeriodEntity } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period/rural-timeline-period.entity';
import type { RuralTimelinePeriodId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period/value-object/rural-timeline-period-id/rural-timeline-period-id.value-object';

export abstract class RuralTimelinePeriodCommandRepositoryGateway {
  public abstract createRuralTimelinePeriod(
    props: RuralTimelinePeriodEntity,
  ): TransactionType;

  public abstract deleteRuralTimelinePeriod(
    id: RuralTimelinePeriodId,
  ): TransactionType;
}
