import type { GetRuralOrHybridRetirementRejectionWithRelationsQueryResult } from './result/get-rural-or-hybrid-retirement-rejection-with-relations.query.result';
import type { RuralOrHybridRetirementRejectionId } from '@module/customer/rural-or-hybrid-retirement-rejection-analysis/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id/rural-or-hybrid-retirement-rejection-id.value-object';

export abstract class RuralOrHybridRetirementRejectionQueryRepositoryGateway {
  public abstract findOneById(
    id: RuralOrHybridRetirementRejectionId,
  ): Promise<GetRuralOrHybridRetirementRejectionWithRelationsQueryResult | null>;

  public abstract findOneByIdWithRelations(
    id: RuralOrHybridRetirementRejectionId,
  ): Promise<GetRuralOrHybridRetirementRejectionWithRelationsQueryResult | null>;
}
