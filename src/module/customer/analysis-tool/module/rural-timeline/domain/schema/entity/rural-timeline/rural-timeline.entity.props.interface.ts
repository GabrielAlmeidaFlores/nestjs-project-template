import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import type { RuralTimelineWorkRegimeEnum } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline/enum/rural-timeline-work-regime.enum';
import type { RuralTimelineId } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline/value-object/rural-timeline-id/rural-timeline-id.value-object';

export interface RuralTimelineEntityPropsInterface extends BaseEntityPropsInterface<RuralTimelineId> {
  ruralTimelineAnalysis?: string | null;
  ruralTimelinePeriodDocumentAnalysis?: string | null;
  analysisToolClientId: AnalysisToolClientId;
  workRegime: RuralTimelineWorkRegimeEnum;
}
