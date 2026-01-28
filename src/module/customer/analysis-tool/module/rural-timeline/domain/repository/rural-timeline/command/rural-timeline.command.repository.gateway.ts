import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RuralTimelineEntity } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline/rural-timeline.entity';
import type { RuralTimelineId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline/value-object/rural-timeline-id/rural-timeline-id.value-object';

export abstract class RuralTimelineCommandRepositoryGateway {
  public abstract createRuralTimeline(
    props: RuralTimelineEntity,
  ): TransactionType;

  public abstract deleteRuralTimeline(id: RuralTimelineId): TransactionType;
}
