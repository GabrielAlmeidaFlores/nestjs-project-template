import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';

import { DisabilityRetirementPlanningPeriodEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period/disability-retirement-planning-period.entity';
import { DisabilityRetirementPlanningPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning/domain/schema/entity/disability-retirement-planning-period/value-object/disability-retirement-planning-period-id.value-object';

export abstract class DisabilityRetirementPlanningPeriodCommandRepositoryGateway {
  public abstract createDisabilityRetirementPlanningPeriod(
    props: DisabilityRetirementPlanningPeriodEntity,
  ): TransactionType;

  public abstract deleteDisabilityRetirementPlanningPeriod(
    id: DisabilityRetirementPlanningPeriodId,
  ): TransactionType;
}
