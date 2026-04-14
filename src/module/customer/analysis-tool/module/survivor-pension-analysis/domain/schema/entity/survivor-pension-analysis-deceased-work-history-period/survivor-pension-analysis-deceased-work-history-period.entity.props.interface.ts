import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { SurvivorPensionAnalysisDeceasedWorkHistoryId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history/value-object/survivor-pension-analysis-deceased-work-history-id/survivor-pension-analysis-deceased-work-history-id.value-object';
import type { SurvivorPensionAnalysisDeceasedWorkHistoryPeriodId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history-period/value-object/survivor-pension-analysis-deceased-work-history-period-id/survivor-pension-analysis-deceased-work-history-period-id.value-object';

export interface SurvivorPensionAnalysisDeceasedWorkHistoryPeriodEntityPropsInterface extends BaseEntityPropsInterface<SurvivorPensionAnalysisDeceasedWorkHistoryPeriodId> {
  survivorPensionAnalysisDeceasedWorkHistoryId: SurvivorPensionAnalysisDeceasedWorkHistoryId;
  startDate?: Date | null;
  endDate?: Date | null;
  specialPeriodStartDate?: Date | null;
  specialPeriodEndDate?: Date | null;
  specialTimeType?: string | null;
  jobTitle?: string | null;
  careerName?: string | null;
  serviceType?: string | null;
  department?: string | null;
}
