import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { GeneralUrbanRetirementAnalysisResultId } from '@module/customer/analysis-tool/module/general-urban-retirement/domain/schema/entity/general-urban-retirement-analysis-result/value-object/general-urban-retirement-analysis-result-id.value-object';

export interface GeneralUrbanRetirementAnalysisResultEntityPropsInterface extends BaseEntityPropsInterface<GeneralUrbanRetirementAnalysisResultId> {
  generalUrbanRetirementCompleteAnalysis?: string | null;
  generalUrbanRetirementCompleteAnalysisDownload?: string | null;
  generalUrbanRetirementSimplifiedAnalysis?: string | null;
}
