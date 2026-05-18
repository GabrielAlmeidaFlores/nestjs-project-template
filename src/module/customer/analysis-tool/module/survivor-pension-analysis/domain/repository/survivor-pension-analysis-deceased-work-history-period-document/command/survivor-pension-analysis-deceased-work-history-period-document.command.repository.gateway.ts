import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history-period/value-object/survivor-pension-analysis-deceased-work-history-period-id/survivor-pension-analysis-deceased-work-history-period-id.value-object';
import type { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history-period-document/survivor-pension-analysis-deceased-work-history-period-document.entity';
import type { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history-period-document/value-object/survivor-pension-analysis-deceased-work-history-period-document-id/survivor-pension-analysis-deceased-work-history-period-document-id.value-object';

export abstract class SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentCommandRepositoryGateway {
  public abstract createSurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocument(
    props: SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentEntity,
  ): TransactionType;

  public abstract deleteSurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocument(
    id: SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentId,
  ): TransactionType;

  public abstract deleteAllBySurvivorPensionAnalysisDeceasedWorkHistoryPeriodId(
    survivorPensionAnalysisDeceasedWorkHistoryPeriodId: SurvivorPensionAnalysisDeceasedWorkHistoryPeriodId,
  ): TransactionType;
}
