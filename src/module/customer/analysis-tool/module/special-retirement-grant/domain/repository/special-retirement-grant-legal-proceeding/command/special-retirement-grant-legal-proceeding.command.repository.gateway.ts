import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SpecialRetirementGrantLegalProceedingEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-legal-proceeding/special-retirement-grant-legal-proceeding.entity';
import type { SpecialRetirementGrantLegalProceedingId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-legal-proceeding/value-object/special-retirement-grant-legal-proceeding-id/special-retirement-grant-legal-proceeding-id.value-object';

export abstract class SpecialRetirementGrantLegalProceedingCommandRepositoryGateway {
  public abstract createSpecialRetirementGrantLegalProceeding(
    props: SpecialRetirementGrantLegalProceedingEntity,
  ): TransactionType;

  public abstract deleteSpecialRetirementGrantLegalProceeding(
    id: SpecialRetirementGrantLegalProceedingId,
  ): TransactionType;
}
