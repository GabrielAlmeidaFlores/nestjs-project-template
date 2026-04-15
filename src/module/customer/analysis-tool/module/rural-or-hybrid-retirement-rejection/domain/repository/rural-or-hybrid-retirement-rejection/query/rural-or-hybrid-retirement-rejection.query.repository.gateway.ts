import type { NotFoundError } from '@core/error/not-found.error';
import type { Constructor } from 'type-fest';

import type { GetRuralOrHybridRetirementRejectionWithRelationsQueryResult } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/repository/rural-or-hybrid-retirement-rejection/query/result/get-rural-or-hybrid-retirement-rejection-with-relations.query.result';
import type { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';

export abstract class RuralOrHybridRetirementRejectionQueryRepositoryGateway {
  public abstract findOneByRuralOrHybridRetirementRejectionIdOrFailWithRelations(
    id: RuralOrHybridRetirementRejectionId,
    err: Constructor<NotFoundError>,
  ): Promise<GetRuralOrHybridRetirementRejectionWithRelationsQueryResult>;
}
