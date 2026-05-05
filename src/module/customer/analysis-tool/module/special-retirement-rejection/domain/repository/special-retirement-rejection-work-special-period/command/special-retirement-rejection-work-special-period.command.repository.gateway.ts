import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SpecialRetirementRejectionId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/value-object/special-retirement-rejection-id.value-object';
import type { SpecialRetirementRejectionWorkSpecialPeriodEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-special-period/special-retirement-rejection-work-special-period.entity';

export abstract class SpecialRetirementRejectionWorkSpecialPeriodCommandRepositoryGateway {
  public abstract createSpecialRetirementRejectionWorkSpecialPeriod(
    props: SpecialRetirementRejectionWorkSpecialPeriodEntity,
  ): TransactionType;

  public abstract deleteAllSpecialRetirementRejectionWorkSpecialPeriodBySpecialRetirementRejectionId(
    specialRetirementRejectionId: SpecialRetirementRejectionId,
  ): TransactionType;
}
