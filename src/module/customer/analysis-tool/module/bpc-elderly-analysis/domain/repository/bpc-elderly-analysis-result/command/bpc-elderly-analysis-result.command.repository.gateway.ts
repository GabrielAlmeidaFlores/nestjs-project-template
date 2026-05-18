import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { BpcElderlyAnalysisId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/value-object/bpc-elderly-analysis-id/bpc-elderly-analysis-id.value-object';
import type { BpcElderlyAnalysisResultEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-result/bpc-elderly-analysis-result.entity';
import type { BpcElderlyAnalysisResultId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-result/value-object/bpc-elderly-analysis-result-id/bpc-elderly-analysis-result-id.value-object';

export abstract class BpcElderlyAnalysisResultCommandRepositoryGateway {
  public abstract createBpcElderlyAnalysisResult(
    props: BpcElderlyAnalysisResultEntity,
    bpcElderlyAnalysisId: BpcElderlyAnalysisId,
  ): TransactionType;

  public abstract updateBpcElderlyAnalysisResult(
    id: BpcElderlyAnalysisResultId,
    props: BpcElderlyAnalysisResultEntity,
  ): TransactionType;
}
