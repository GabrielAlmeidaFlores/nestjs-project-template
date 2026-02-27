import { DisabilityRetirementPlanningId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/value-object/disability-retirement-planning-id.value-object';
import { GetDisabilityRetirementPlanningWithRelationsQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/repository/disability-retirement-planning/query/result/get-disability-retirement-planning-with-relations.query.result';

export abstract class DisabilityRetirementPlanningQueryRepositoryGateway {
  public abstract findOneDisabilityRetirementPlanningByIdWithRelations(
    id: DisabilityRetirementPlanningId,
  ): Promise<GetDisabilityRetirementPlanningWithRelationsQueryResult | null>;
}
