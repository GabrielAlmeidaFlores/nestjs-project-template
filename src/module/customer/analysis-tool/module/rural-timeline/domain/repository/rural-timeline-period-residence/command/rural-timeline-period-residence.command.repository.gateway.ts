import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RuralTimelinePeriodResidenceEntity } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-residence/rural-timeline-period-residence.entity';
import type { RuralTimelinePeriodResidenceId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-residence/value-object/rural-timeline-period-residence-id/rural-timeline-period-residence-id.value-object';

export abstract class RuralTimelinePeriodResidenceCommandRepositoryGateway {
  public abstract createRuralTimelinePeriodResidence(
    props: RuralTimelinePeriodResidenceEntity,
  ): TransactionType;

  public abstract deleteRuralTimelinePeriodResidence(
    id: RuralTimelinePeriodResidenceId,
  ): TransactionType;
}
