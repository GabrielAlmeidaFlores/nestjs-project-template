import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DisabilityRetirementPlanningGrantDisabilityPeriodEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period/disability-retirement-planning-grant-disability-period.entity';
import type { DisabilityRetirementPlanningGrantDisabilityPeriodId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-disability-period/value-object/disability-retirement-planning-grant-disability-period-id.value-object';

export abstract class DisabilityRetirementPlanningGrantDisabilityPeriodCommandRepositoryGateway {
  public abstract createDisabilityRetirementPlanningGrantDisabilityPeriod(
    props: DisabilityRetirementPlanningGrantDisabilityPeriodEntity,
  ): TransactionType;

  public abstract updateDisabilityRetirementPlanningGrantDisabilityPeriod(
    id: DisabilityRetirementPlanningGrantDisabilityPeriodId,
    props: DisabilityRetirementPlanningGrantDisabilityPeriodEntity,
  ): TransactionType;
}
