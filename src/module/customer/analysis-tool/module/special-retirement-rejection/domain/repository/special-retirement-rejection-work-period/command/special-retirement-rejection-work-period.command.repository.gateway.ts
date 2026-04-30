import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SpecialRetirementRejectionId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/value-object/special-retirement-rejection-id.value-object';
import type { SpecialRetirementRejectionWorkPeriodEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-period/special-retirement-rejection-work-period.entity';

export abstract class SpecialRetirementRejectionWorkPeriodCommandRepositoryGateway {
  public abstract createSpecialRetirementRejectionWorkPeriod(
    props: SpecialRetirementRejectionWorkPeriodEntity,
  ): TransactionType;

  public abstract deleteAllSpecialRetirementRejectionWorkPeriodBySpecialRetirementRejectionId(
    specialRetirementRejectionId: SpecialRetirementRejectionId,
  ): TransactionType;
}
