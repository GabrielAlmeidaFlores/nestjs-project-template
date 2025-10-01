import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { CnisFastAnalysisEntity } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis/cnis-fast-analysis.entity';
import type { CnisFastAnalysisId } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';

export abstract class CnisFastAnalysisCommandRepositoryGateway {
  public abstract createCnisFastAnalysis(
    props: CnisFastAnalysisEntity,
  ): TransactionType;

  public abstract updateCnisFastAnalysis(
    id: CnisFastAnalysisId,
    props: CnisFastAnalysisEntity,
  ): TransactionType;
}
