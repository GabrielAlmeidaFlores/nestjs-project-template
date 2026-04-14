import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SpecialRetirementGrantPeriodEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period/special-retirement-grant-period.entity';
import type { SpecialRetirementGrantPeriodId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-period/value-object/special-retirement-grant-period-id/special-retirement-grant-period-id.value-object';

export abstract class SpecialRetirementGrantPeriodCommandRepositoryGateway {
  public abstract createSpecialRetirementGrantPeriod(
    props: SpecialRetirementGrantPeriodEntity,
  ): TransactionType;

  public abstract deleteSpecialRetirementGrantPeriod(
    id: SpecialRetirementGrantPeriodId,
  ): TransactionType;
}
