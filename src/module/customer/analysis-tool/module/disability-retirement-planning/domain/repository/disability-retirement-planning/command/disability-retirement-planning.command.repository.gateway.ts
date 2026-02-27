import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DisabilityRetirementPlanningEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/disability-retirement-planning.entity';
import type { DisabilityRetirementPlanningId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning/value-object/disability-retirement-planning-id.value-object';

export abstract class DisabilityRetirementPlanningCommandRepositoryGateway {
  public abstract createDisabilityRetirementPlanning(
    props: DisabilityRetirementPlanningEntity,
  ): TransactionType;

  public abstract updateDisabilityRetirementPlanning(
    id: DisabilityRetirementPlanningId,
    props: DisabilityRetirementPlanningEntity,
  ): TransactionType;

  public abstract deleteDisabilityRetirementPlanning(
    id: DisabilityRetirementPlanningId,
  ): TransactionType;
}
