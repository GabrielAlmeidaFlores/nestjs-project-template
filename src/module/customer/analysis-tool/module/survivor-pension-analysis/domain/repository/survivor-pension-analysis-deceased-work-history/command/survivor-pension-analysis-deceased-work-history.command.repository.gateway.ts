import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SurvivorPensionAnalysisDeceasedWorkHistoryEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history/survivor-pension-analysis-deceased-work-history.entity';
import type { SurvivorPensionAnalysisDeceasedWorkHistoryId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history/value-object/survivor-pension-analysis-deceased-work-history-id/survivor-pension-analysis-deceased-work-history-id.value-object';

export abstract class SurvivorPensionAnalysisDeceasedWorkHistoryCommandRepositoryGateway {
  public abstract createSurvivorPensionAnalysisDeceasedWorkHistory(
    props: SurvivorPensionAnalysisDeceasedWorkHistoryEntity,
  ): TransactionType;

  public abstract updateSurvivorPensionAnalysisDeceasedWorkHistory(
    id: SurvivorPensionAnalysisDeceasedWorkHistoryId,
    props: SurvivorPensionAnalysisDeceasedWorkHistoryEntity,
  ): TransactionType;

  public abstract deleteSurvivorPensionAnalysisDeceasedWorkHistory(
    id: SurvivorPensionAnalysisDeceasedWorkHistoryId,
  ): TransactionType;
}
