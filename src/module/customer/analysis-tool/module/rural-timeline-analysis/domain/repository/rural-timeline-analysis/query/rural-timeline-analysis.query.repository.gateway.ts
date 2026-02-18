import type { GetRuralTimelineAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis/query/result/get-rural-timeline-analysis-with-relations.query.result';
import type { RuralTimelineAnalysisEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/rural-timeline-analysis.entity';
import type { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';

export abstract class RuralTimelineAnalysisQueryRepositoryGateway {
  public abstract findOneById(
    id: RuralTimelineAnalysisId,
  ): Promise<RuralTimelineAnalysisEntity | null>;

  public abstract findOneByIdWithRelations(
    id: RuralTimelineAnalysisId,
  ): Promise<GetRuralTimelineAnalysisWithRelationsQueryResult | null>;

  public abstract findWithRelationsByRuralTimelineAnalysisIdOrFail(
    id: RuralTimelineAnalysisId,
  ): Promise<GetRuralTimelineAnalysisWithRelationsQueryResult>;
}
