import type { RuralTimelineEntity } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline/rural-timeline.entity';
import type { RuralTimelineId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline/value-object/rural-timeline-id/rural-timeline-id.value-object';

export abstract class RuralTimelineQueryRepositoryGateway {
  public abstract findOneByIdWithRelations(
    id: RuralTimelineId,
  ): Promise<RuralTimelineEntity | null>;
}
