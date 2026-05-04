import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { BpcElderlyCessationLegalProceedingEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-legal-proceeding/bpc-elderly-cessation-legal-proceeding.entity';
import type { BpcElderlyCessationLegalProceedingId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-legal-proceeding/value-object/bpc-elderly-cessation-legal-proceeding-id/bpc-elderly-cessation-legal-proceeding-id.value-object';

export abstract class BpcElderlyCessationLegalProceedingCommandRepositoryGateway {
  public abstract createBpcElderlyCessationLegalProceeding(
    props: BpcElderlyCessationLegalProceedingEntity,
  ): TransactionType;

  public abstract deleteBpcElderlyCessationLegalProceeding(
    id: BpcElderlyCessationLegalProceedingId,
  ): TransactionType;
}
