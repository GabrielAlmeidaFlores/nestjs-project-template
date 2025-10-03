import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { CnisFastAnalysisClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-client/cnis-fast-analysis-client.entity';
import type { CnisFastAnalysisClientId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis-client/value-object/cnis-fast-analysis-client-id/cnis-fast-analysis-client-id.value-object';

export abstract class CnisFastAnalysisClientCommandRepositoryGateway {
  public abstract createCnisFastAnalysisClient(
    props: CnisFastAnalysisClientEntity,
  ): TransactionType;

  public abstract updateCnisFastAnalysisClient(
    id: CnisFastAnalysisClientId,
    props: CnisFastAnalysisClientEntity,
  ): TransactionType;
}
