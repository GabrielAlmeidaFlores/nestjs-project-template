import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DisabilityRetirementPlanningGrantPeriodEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/disability-retirement-planning-grant-period.entity';
import type { DisabilityRetirementPlanningGrantPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-period/value-object/disability-retirement-planning-grant-period-id.value-object';

export abstract class DisabilityRetirementPlanningGrantPeriodCommandRepositoryGateway {
  public abstract createDisabilityRetirementPlanningGrantPeriod(
    props: DisabilityRetirementPlanningGrantPeriodEntity,
  ): TransactionType;

  public abstract updateDisabilityRetirementPlanningGrantPeriod(
    id: DisabilityRetirementPlanningGrantPeriodId,
    props: DisabilityRetirementPlanningGrantPeriodEntity,
  ): TransactionType;
}
