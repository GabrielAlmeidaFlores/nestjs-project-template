import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import type { RuralTimelineAnalysisWorkRegimeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/enum/rural-timeline-work-regime.enum';
import type { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';

export interface RuralTimelineAnalysisEntityPropsInterface extends BaseEntityPropsInterface<RuralTimelineAnalysisId> {
  ruralTimelineCompleteAnalysis?: string | null;
  ruralTimelineSimplifiedAnalysis?: string | null;
  ruralTimelinePeriodDocumentAnalysis?: string | null;
  analysisToolClientId: AnalysisToolClientId;
  workRegime: RuralTimelineAnalysisWorkRegimeEnum;
  legalProceedingNumber?: string[] | null;
  inssBenefitNumber?: string[] | null;
}
