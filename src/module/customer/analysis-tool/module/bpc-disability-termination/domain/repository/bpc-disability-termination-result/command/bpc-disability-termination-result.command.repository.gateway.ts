import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { BpcDisabilityTerminationId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/value-object/bpc-disability-termination-id/bpc-disability-termination-id.value-object';
import type { BpcDisabilityTerminationResultEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-result/bpc-disability-termination-result.entity';
import type { BpcDisabilityTerminationResultId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-result/value-object/bpc-disability-termination-result-id/bpc-disability-termination-result-id.value-object';

export abstract class BpcDisabilityTerminationResultCommandRepositoryGateway {
  public abstract createBpcDisabilityTerminationResult(
    props: BpcDisabilityTerminationResultEntity,
    bpcDisabilityTerminationId: BpcDisabilityTerminationId,
  ): TransactionType;

  public abstract updateBpcDisabilityTerminationResult(
    id: BpcDisabilityTerminationResultId,
    props: BpcDisabilityTerminationResultEntity,
  ): TransactionType;
}
