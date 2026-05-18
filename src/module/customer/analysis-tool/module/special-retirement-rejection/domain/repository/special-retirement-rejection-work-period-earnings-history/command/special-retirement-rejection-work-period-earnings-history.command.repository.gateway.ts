import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SpecialRetirementRejectionId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/value-object/special-retirement-rejection-id.value-object';
import type { SpecialRetirementRejectionWorkPeriodEarningsHistoryEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period-earnings-history/special-retirement-rejection-work-period-earnings-history.entity';

export abstract class SpecialRetirementRejectionWorkPeriodEarningsHistoryCommandRepositoryGateway {
  public abstract createSpecialRetirementRejectionWorkPeriodEarningsHistory(
    props: SpecialRetirementRejectionWorkPeriodEarningsHistoryEntity,
  ): TransactionType;

  public abstract deleteAllSpecialRetirementRejectionWorkPeriodEarningsHistoryBySpecialRetirementRejectionId(
    specialRetirementRejectionId: SpecialRetirementRejectionId,
  ): TransactionType;
}
