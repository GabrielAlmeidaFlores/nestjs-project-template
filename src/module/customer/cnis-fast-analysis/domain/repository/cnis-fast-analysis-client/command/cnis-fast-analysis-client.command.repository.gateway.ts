import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { CnisFastAnalysisClientEntity } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-client/cnis-fast-analysis-client.entity';

export abstract class CnisFastAnalysisClientCommandRepositoryGateway {
  public abstract createCnisFastAnalysisClient(
    props: CnisFastAnalysisClientEntity,
  ): TransactionType;
}
