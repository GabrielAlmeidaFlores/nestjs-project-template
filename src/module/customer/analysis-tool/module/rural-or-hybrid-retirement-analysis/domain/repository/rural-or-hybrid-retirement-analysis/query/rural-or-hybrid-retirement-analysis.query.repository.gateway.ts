import type { NotFoundError } from '@core/error/not-found.error';
import type { GetRuralOrHybridRetirementAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/repository/rural-or-hybrid-retirement-analysis/query/result/get-rural-or-hybrid-retirement-analysis-with-relations.query.result';
import type { RuralOrHybridRetirementAnalysisId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/value-object/rural-or-hybrid-retirement-analysis-id.value-object';
import type { Constructor } from 'type-fest';

export abstract class RuralOrHybridRetirementAnalysisQueryRepositoryGateway {
  public abstract findOneByRuralOrHybridRetirementAnalysisIdOrFailWithRelations(
    id: RuralOrHybridRetirementAnalysisId,
    err: Constructor<NotFoundError>,
  ): Promise<GetRuralOrHybridRetirementAnalysisWithRelationsQueryResult>;
}
