import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SurvivorPensionAnalysisResultEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result/survivor-pension-analysis-result.entity';
import type { SurvivorPensionAnalysisResultId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result/value-object/survivor-pension-analysis-result-id/survivor-pension-analysis-result-id.value-object';

export abstract class SurvivorPensionAnalysisResultCommandRepositoryGateway {
  public abstract createSurvivorPensionAnalysisResult(
    props: SurvivorPensionAnalysisResultEntity,
  ): TransactionType;

  public abstract updateSurvivorPensionAnalysisResult(
    id: SurvivorPensionAnalysisResultId,
    props: SurvivorPensionAnalysisResultEntity,
  ): TransactionType;

  public abstract deleteSurvivorPensionAnalysisResult(
    id: SurvivorPensionAnalysisResultId,
  ): TransactionType;
}
