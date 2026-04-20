import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DisabilityRetirementPlanningRejectionPeriodEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/disability-retirement-planning-rejection-period.entity';
import type { DisabilityRetirementPlanningRejectionPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-period/value-object/disability-retirement-planning-rejection-period-id/disability-retirement-planning-rejection-period-id.value-object';

export abstract class DisabilityRetirementPlanningRejectionPeriodCommandRepositoryGateway {
  public abstract createDisabilityRetirementPlanningRejectionPeriod(
    props: DisabilityRetirementPlanningRejectionPeriodEntity,
  ): TransactionType;

  public abstract deleteDisabilityRetirementPlanningRejectionPeriod(
    id: DisabilityRetirementPlanningRejectionPeriodId,
  ): TransactionType;
}
