import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SpecialRetirementRejectionId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/value-object/special-retirement-rejection-id.value-object';
import type { SpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-work-special-period-legal-framework/special-retirement-rejection-work-special-period-legal-framework.entity';

export abstract class SpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkCommandRepositoryGateway {
  public abstract createSpecialRetirementRejectionWorkSpecialPeriodLegalFramework(
    props: SpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkEntity,
  ): TransactionType;

  public abstract deleteAllSpecialRetirementRejectionWorkSpecialPeriodLegalFrameworkBySpecialRetirementRejectionId(
    specialRetirementRejectionId: SpecialRetirementRejectionId,
  ): TransactionType;
}
