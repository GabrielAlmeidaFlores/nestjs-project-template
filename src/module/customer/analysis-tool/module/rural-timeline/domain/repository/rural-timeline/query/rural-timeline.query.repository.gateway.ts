import type { GetRuralTimelineWithRelationsQueryResult } from '@module/customer/analysis-tool/module/rural-timeline/domain/repository/rural-timeline/query/result/get-rural-timeline-with-relations.query.result';
import type { RuralTimelineId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline/value-object/rural-timeline-id/rural-timeline-id.value-object';

export abstract class RuralTimelineQueryRepositoryGateway {
  public abstract findOneByIdWithRelations(
    id: RuralTimelineId,
  ): Promise<GetRuralTimelineWithRelationsQueryResult | null>;
}
