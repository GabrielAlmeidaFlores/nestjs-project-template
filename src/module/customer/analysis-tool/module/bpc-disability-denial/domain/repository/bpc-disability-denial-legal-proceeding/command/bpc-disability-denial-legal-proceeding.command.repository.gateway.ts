import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { BpcDisabilityDenialLegalProceedingEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-legal-proceeding/bpc-disability-denial-legal-proceeding.entity';
import type { BpcDisabilityDenialLegalProceedingId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-legal-proceeding/value-object/bpc-disability-denial-legal-proceeding-id/bpc-disability-denial-legal-proceeding-id.value-object';

export abstract class BpcDisabilityDenialLegalProceedingCommandRepositoryGateway {
  public abstract createBpcDisabilityDenialLegalProceeding(
    props: BpcDisabilityDenialLegalProceedingEntity,
  ): TransactionType;

  public abstract deleteBpcDisabilityDenialLegalProceeding(
    id: BpcDisabilityDenialLegalProceedingId,
  ): TransactionType;
}
