import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { BpcDisabilityDenialId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial/value-object/bpc-disability-denial-id/bpc-disability-denial-id.value-object';
import type { BpcDisabilityDenialResultEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-result/bpc-disability-denial-result.entity';
import type { BpcDisabilityDenialResultId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-result/value-object/bpc-disability-denial-result-id/bpc-disability-denial-result-id.value-object';

export abstract class BpcDisabilityDenialResultCommandRepositoryGateway {
  public abstract createBpcDisabilityDenialResult(
    props: BpcDisabilityDenialResultEntity,
    bpcDisabilityDenialId: BpcDisabilityDenialId,
  ): TransactionType;

  public abstract updateBpcDisabilityDenialResult(
    id: BpcDisabilityDenialResultId,
    props: BpcDisabilityDenialResultEntity,
  ): TransactionType;
}
