import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TemporaryDisabilityBenefitsGrantId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/value-object/temporary-disability-benefits-grant-id.value-object';
import type { TemporaryDisabilityBenefitsGrantLegalProceedingEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-legal-proceeding/temporary-disability-benefits-grant-legal-proceeding.entity';

export abstract class TemporaryDisabilityBenefitsGrantLegalProceedingCommandRepositoryGateway {
  public abstract createTemporaryDisabilityBenefitsGrantLegalProceeding(
    props: TemporaryDisabilityBenefitsGrantLegalProceedingEntity,
  ): TransactionType;

  public abstract deleteAllByTemporaryDisabilityBenefitsGrantId(
    temporaryDisabilityBenefitsGrantId: TemporaryDisabilityBenefitsGrantId,
  ): TransactionType;
}
