import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SpecialRetirementGrantPeriodUnderMinimumEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period-under-minimum/special-retirement-grant-period-under-minimum.entity';

export abstract class SpecialRetirementGrantPeriodUnderMinimumCommandRepositoryGateway {
  public abstract createSpecialRetirementGrantPeriodUnderMinimum(
    props: SpecialRetirementGrantPeriodUnderMinimumEntity,
  ): TransactionType;
}
