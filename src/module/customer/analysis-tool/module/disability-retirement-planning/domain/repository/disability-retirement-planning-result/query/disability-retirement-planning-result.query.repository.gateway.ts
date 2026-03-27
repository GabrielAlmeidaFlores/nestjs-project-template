import type { DisabilityRetirementPlanningId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/value-object/disability-retirement-planning-id.value-object';
import type { DisabilityRetirementPlanningResultId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-result/value-object/disability-retirement-planning-result-id.value-object';

export abstract class DisabilityRetirementPlanningResultQueryRepositoryGateway {
  public abstract findOneIdByDisabilityRetirementPlanningId(
    disabilityRetirementPlanningId: DisabilityRetirementPlanningId,
  ): Promise<DisabilityRetirementPlanningResultId | null>;
}
