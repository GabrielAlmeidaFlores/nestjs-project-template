import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { CnisFastAnalysisResultEntity } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-result/cnis-fast-analysis-result.entity';

export abstract class CnisFastAnalysisResultCommandRepositoryGateway {
  public abstract createCnisFastAnalysisResult(
    props: CnisFastAnalysisResultEntity,
  ): TransactionType;
}
