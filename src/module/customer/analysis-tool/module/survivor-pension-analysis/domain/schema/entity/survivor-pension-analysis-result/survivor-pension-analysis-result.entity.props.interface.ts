import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import type { SurvivorPensionAnalysisResultId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result/value-object/survivor-pension-analysis-result-id/survivor-pension-analysis-result-id.value-object';

export interface SurvivorPensionAnalysisResultEntityPropsInterface extends BaseEntityPropsInterface<SurvivorPensionAnalysisResultId> {
  survivorPensionAnalysisId: SurvivorPensionAnalysisId;
  isInsuredStatusConfirmed?: boolean | null;
  insuredStatusSummary?: string | null;
  isRetirementRightConfirmed?: boolean | null;
  retirementRightSummary?: string | null;
  completeAnalysis?: string | null;
  simplifiedAnalysis?: string | null;
}
