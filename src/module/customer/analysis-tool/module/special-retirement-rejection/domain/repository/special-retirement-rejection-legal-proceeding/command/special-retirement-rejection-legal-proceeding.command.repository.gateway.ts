import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SpecialRetirementRejectionId } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection/value-object/special-retirement-rejection-id.value-object';
import type { SpecialRetirementRejectionLegalProceedingEntity } from '@module/customer/analysis-tool/module/special-retirement-rejection/domain/schema/entity/special-retirement-rejection-legal-proceeding/special-retirement-rejection-legal-proceeding.entity';

export abstract class SpecialRetirementRejectionLegalProceedingCommandRepositoryGateway {
  public abstract createSpecialRetirementRejectionLegalProceeding(
    props: SpecialRetirementRejectionLegalProceedingEntity,
  ): TransactionType;

  public abstract deleteAllSpecialRetirementRejectionLegalProceedingBySpecialRetirementRejectionId(
    specialRetirementRejectionId: SpecialRetirementRejectionId,
  ): TransactionType;
}
