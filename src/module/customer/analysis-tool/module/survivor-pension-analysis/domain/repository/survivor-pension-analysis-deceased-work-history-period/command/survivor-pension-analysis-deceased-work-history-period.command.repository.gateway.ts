import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SurvivorPensionAnalysisDeceasedWorkHistoryId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history/value-object/survivor-pension-analysis-deceased-work-history-id/survivor-pension-analysis-deceased-work-history-id.value-object';
import type { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history-period/survivor-pension-analysis-deceased-work-history-period.entity';
import type { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history-period/value-object/survivor-pension-analysis-deceased-work-history-period-id/survivor-pension-analysis-deceased-work-history-period-id.value-object';

export abstract class SurvivorPensionAnalysisDeceasedWorkHistoryPeriodCommandRepositoryGateway {
  public abstract createSurvivorPensionAnalysisDeceasedWorkHistoryPeriod(
    props: SurvivorPensionAnalysisDeceasedWorkHistoryPeriodEntity,
  ): TransactionType;

  public abstract updateSurvivorPensionAnalysisDeceasedWorkHistoryPeriod(
    id: SurvivorPensionAnalysisDeceasedWorkHistoryPeriodId,
    props: SurvivorPensionAnalysisDeceasedWorkHistoryPeriodEntity,
  ): TransactionType;

  public abstract deleteSurvivorPensionAnalysisDeceasedWorkHistoryPeriod(
    id: SurvivorPensionAnalysisDeceasedWorkHistoryPeriodId,
  ): TransactionType;

  public abstract deleteAllBySurvivorPensionAnalysisDeceasedWorkHistoryId(
    survivorPensionAnalysisDeceasedWorkHistoryId: SurvivorPensionAnalysisDeceasedWorkHistoryId,
  ): TransactionType;
}
