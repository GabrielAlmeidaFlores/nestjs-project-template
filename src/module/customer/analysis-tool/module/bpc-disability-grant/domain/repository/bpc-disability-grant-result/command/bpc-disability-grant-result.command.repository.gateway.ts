import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { BpcDisabilityGrantId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/value-object/bpc-disability-grant-id/bpc-disability-grant-id.value-object';
import type { BpcDisabilityGrantResultEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-result/bpc-disability-grant-result.entity';
import type { BpcDisabilityGrantResultId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-result/value-object/bpc-disability-grant-result-id/bpc-disability-grant-result-id.value-object';

export abstract class BpcDisabilityGrantResultCommandRepositoryGateway {
  public abstract createBpcDisabilityGrantResult(
    props: BpcDisabilityGrantResultEntity,
    BpcDisabilityGrantId: BpcDisabilityGrantId,
  ): TransactionType;

  public abstract updateBpcDisabilityGrantResult(
    id: BpcDisabilityGrantResultId,
    props: BpcDisabilityGrantResultEntity,
  ): TransactionType;
}
