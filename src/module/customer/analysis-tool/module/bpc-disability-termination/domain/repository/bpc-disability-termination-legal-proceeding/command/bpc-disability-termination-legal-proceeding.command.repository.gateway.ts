import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { BpcDisabilityTerminationLegalProceedingEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-legal-proceeding/bpc-disability-termination-legal-proceeding.entity';
import type { BpcDisabilityTerminationLegalProceedingId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-legal-proceeding/value-object/bpc-disability-termination-legal-proceeding-id/bpc-disability-termination-legal-proceeding-id.value-object';

export abstract class BpcDisabilityTerminationLegalProceedingCommandRepositoryGateway {
  public abstract createBpcDisabilityTerminationLegalProceeding(
    props: BpcDisabilityTerminationLegalProceedingEntity,
  ): TransactionType;

  public abstract deleteBpcDisabilityTerminationLegalProceeding(
    id: BpcDisabilityTerminationLegalProceedingId,
  ): TransactionType;
}
