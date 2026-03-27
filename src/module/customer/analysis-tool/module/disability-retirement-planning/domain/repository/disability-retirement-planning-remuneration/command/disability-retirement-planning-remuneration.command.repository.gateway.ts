import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DisabilityRetirementPlanningRemunerationEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-remuneration/disability-retirement-planning-remuneration.entity';
import type { DisabilityRetirementPlanningRemunerationId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-remuneration/value-object/disability-retirement-planning-remuneration-id.value-object';

export abstract class DisabilityRetirementPlanningRemunerationCommandRepositoryGateway {
  public abstract createDisabilityRetirementPlanningRemuneration(
    props: DisabilityRetirementPlanningRemunerationEntity,
  ): TransactionType;

  public abstract updateDisabilityRetirementPlanningRemuneration(
    id: DisabilityRetirementPlanningRemunerationId,
    props: DisabilityRetirementPlanningRemunerationEntity,
  ): TransactionType;

  public abstract deleteDisabilityRetirementPlanningRemuneration(
    id: DisabilityRetirementPlanningRemunerationId,
  ): TransactionType;
}
