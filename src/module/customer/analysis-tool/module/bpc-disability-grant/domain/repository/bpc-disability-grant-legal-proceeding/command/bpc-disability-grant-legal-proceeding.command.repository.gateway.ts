import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { BpcDisabilityGrantLegalProceedingEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-legal-proceeding/bpc-disability-grant-legal-proceeding.entity';
import type { BpcDisabilityGrantLegalProceedingId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-legal-proceeding/value-object/bpc-disability-grant-legal-proceeding-id/bpc-disability-grant-legal-proceeding-id.value-object';

export abstract class BpcDisabilityGrantLegalProceedingCommandRepositoryGateway {
  public abstract createBpcDisabilityGrantLegalProceeding(
    props: BpcDisabilityGrantLegalProceedingEntity,
  ): TransactionType;

  public abstract deleteBpcDisabilityGrantLegalProceeding(
    id: BpcDisabilityGrantLegalProceedingId,
  ): TransactionType;
}
