import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SpecialRetirementGrantPeriodPendingExitDateEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-pending-exit-date/special-retirement-grant-period-pending-exit-date.entity';

export abstract class SpecialRetirementGrantPeriodPendingExitDateCommandRepositoryGateway {
  public abstract createSpecialRetirementGrantPeriodPendingExitDate(
    props: SpecialRetirementGrantPeriodPendingExitDateEntity,
  ): TransactionType;
}
