import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import type { SurvivorPensionAnalysisDeceasedWorkHistoryId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-work-history/value-object/survivor-pension-analysis-deceased-work-history-id/survivor-pension-analysis-deceased-work-history-id.value-object';

export type SurvivorPensionAnalysisDeceasedWorkHistoryRemunerationType = {
  remunerationDate: Date;
  remunerationAmount: number;
};

export interface SurvivorPensionAnalysisDeceasedWorkHistoryEntityPropsInterface extends BaseEntityPropsInterface<SurvivorPensionAnalysisDeceasedWorkHistoryId> {
  survivorPensionAnalysisId: SurvivorPensionAnalysisId;
  startDate?: Date | null;
  endDate?: Date | null;
  remunerations?:
    | SurvivorPensionAnalysisDeceasedWorkHistoryRemunerationType[]
    | null;
}
