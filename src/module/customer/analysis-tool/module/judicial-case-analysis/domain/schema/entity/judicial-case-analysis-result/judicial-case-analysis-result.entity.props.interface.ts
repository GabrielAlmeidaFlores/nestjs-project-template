import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { JudicialCaseAnalysisResultId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-result/value-object/judicial-case-analysis-result-id/judicial-case-analysis-result-id.value-object';

export interface JudicialCaseAnalysisResultEntityPropsInterface extends BaseEntityPropsInterface<JudicialCaseAnalysisResultId> {
  judicialCaseCompleteAnalysis?: string | null;
  judicialCaseSimplifiedAnalysis?: string | null;
}
