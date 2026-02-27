import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';

import { DisabilityRetirementPlanningPeriodDisabilityEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-disability/disability-retirement-planning-period-disability.entity';
import { DisabilityRetirementPlanningPeriodDisabilityId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period-disability/value-object/disability-retirement-planning-period-disability-id.value-object';

export abstract class DisabilityRetirementPlanningPeriodDisabilityCommandRepositoryGateway {
  public abstract createDisabilityRetirementPlanningPeriodDisability(
    props: DisabilityRetirementPlanningPeriodDisabilityEntity,
  ): TransactionType;

  public abstract deleteDisabilityRetirementPlanningPeriodDisability(
    id: DisabilityRetirementPlanningPeriodDisabilityId,
  ): TransactionType;
}
