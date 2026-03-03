import type { DisabilityRetirementPlanningEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/disability-retirement-planning.entity';
import type { DisabilityRetirementPlanningId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/value-object/disability-retirement-planning-id.value-object';
import type { DisabilityRetirementPlanningResultId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-result/value-object/disability-retirement-planning-result-id.value-object';
import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';

export abstract class DisabilityRetirementPlanningCommandRepositoryGateway {
  public abstract createDisabilityRetirementPlanning(
    props: DisabilityRetirementPlanningEntity,
  ): TransactionType;

  public abstract updateDisabilityRetirementPlanning(
    id: DisabilityRetirementPlanningId,
    props: DisabilityRetirementPlanningEntity,
  ): TransactionType;

  public abstract updateDisabilityRetirementPlanningResultId(
    planningId: DisabilityRetirementPlanningId,
    resultId: DisabilityRetirementPlanningResultId,
  ): TransactionType;

  public abstract deleteDisabilityRetirementPlanning(
    id: DisabilityRetirementPlanningId,
  ): TransactionType;
}
