import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history-period/value-object/survivor-pension-analysis-deceased-work-history-period-id/survivor-pension-analysis-deceased-work-history-period-id.value-object';
import type { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history-period-document/value-object/survivor-pension-analysis-deceased-work-history-period-document-id/survivor-pension-analysis-deceased-work-history-period-document-id.value-object';

export interface SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentEntityPropsInterface extends BaseEntityPropsInterface<SurvivorPensionAnalysisDeceasedWorkHistoryPeriodDocumentId> {
  documentType: string;
  documentName: string;
  survivorPensionAnalysisDeceasedWorkHistoryPeriodId: SurvivorPensionAnalysisDeceasedWorkHistoryPeriodId;
}
