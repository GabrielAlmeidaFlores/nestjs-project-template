import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SurvivorPensionAnalysisResultId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result/value-object/survivor-pension-analysis-result-id/survivor-pension-analysis-result-id.value-object';
import type { SurvivorPensionAnalysisResultDependentPensionAnalysisEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result-dependent-pension-analysis/survivor-pension-analysis-result-dependent-pension-analysis.entity';
import type { SurvivorPensionAnalysisResultDependentPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result-dependent-pension-analysis/value-object/survivor-pension-analysis-result-dependent-pension-analysis-id/survivor-pension-analysis-result-dependent-pension-analysis-id.value-object';

export abstract class SurvivorPensionAnalysisResultDependentPensionAnalysisCommandRepositoryGateway {
  public abstract createSurvivorPensionAnalysisResultDependentPensionAnalysis(
    props: SurvivorPensionAnalysisResultDependentPensionAnalysisEntity,
  ): TransactionType;

  public abstract deleteSurvivorPensionAnalysisResultDependentPensionAnalysis(
    id: SurvivorPensionAnalysisResultDependentPensionAnalysisId,
  ): TransactionType;

  public abstract deleteAllBySurvivorPensionAnalysisResultId(
    survivorPensionAnalysisResultId: SurvivorPensionAnalysisResultId,
  ): TransactionType;
}
