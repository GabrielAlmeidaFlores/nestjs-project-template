import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { BpcElderlyCessationId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation/value-object/bpc-elderly-cessation-id/bpc-elderly-cessation-id.value-object';
import type { BpcElderlyCessationResultEntity } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-result/bpc-elderly-cessation-result.entity';
import type { BpcElderlyCessationResultId } from '@module/customer/analysis-tool/module/bpc-elderly-cessation/domain/schema/entity/bpc-elderly-cessation-result/value-object/bpc-elderly-cessation-result-id/bpc-elderly-cessation-result-id.value-object';

export abstract class BpcElderlyCessationResultCommandRepositoryGateway {
  public abstract createBpcElderlyCessationResult(
    props: BpcElderlyCessationResultEntity,
    bpcElderlyCessationId: BpcElderlyCessationId,
  ): TransactionType;

  public abstract updateBpcElderlyCessationResult(
    id: BpcElderlyCessationResultId,
    props: BpcElderlyCessationResultEntity,
  ): TransactionType;
}
