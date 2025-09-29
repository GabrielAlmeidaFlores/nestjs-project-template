import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { CnisFastAnalysisEntity } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis/cnis-fast-analysis.entity';

export abstract class CnisFastAnalysisCommandRepositoryGateway {
  public abstract createCnisFastAnalysis(
    props: CnisFastAnalysisEntity,
  ): TransactionType;
}
