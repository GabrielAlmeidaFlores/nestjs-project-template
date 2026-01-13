import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { CnisFastAnalysisResultEntity } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-result/cnis-fast-analysis-result.entity';
import type { CnisFastAnalysisResultId } from '@module/customer/analysis-tool/module/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-result/value-object/cnis-fast-analysis-result-id/cnis-fast-analysis-result-id.value-object';

export abstract class CnisFastAnalysisResultCommandRepositoryGateway {
  public abstract createCnisFastAnalysisResult(
    props: CnisFastAnalysisResultEntity,
  ): TransactionType;

  public abstract updateCnisFastAnalysisResult(
    id: CnisFastAnalysisResultId,
    props: CnisFastAnalysisResultEntity,
  ): TransactionType;
}
