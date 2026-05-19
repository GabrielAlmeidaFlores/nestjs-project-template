import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SurvivorPensionAnalysisEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/survivor-pension-analysis.entity';
import type { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';

export abstract class SurvivorPensionAnalysisCommandRepositoryGateway {
  public abstract createSurvivorPensionAnalysis(
    props: SurvivorPensionAnalysisEntity,
  ): TransactionType;

  public abstract updateSurvivorPensionAnalysis(
    id: SurvivorPensionAnalysisId,
    props: SurvivorPensionAnalysisEntity,
  ): TransactionType;

  public abstract deleteSurvivorPensionAnalysis(
    id: SurvivorPensionAnalysisId,
  ): TransactionType;
}
