import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RuralTimelineAnalysisEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/rural-timeline-analysis.entity';
import type { RuralTimelineAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-legal-proceeding/value-object/rural-timeline-analysis-legal-proceeding-id/rural-timeline-analysis-legal-proceeding-id.value-object';

export interface RuralTimelineAnalysisLegalProceedingEntityPropsInterface extends BaseEntityPropsInterface<RuralTimelineAnalysisLegalProceedingId> {
  legalProceedingNumber: string;
  ruralTimelineAnalysis: RuralTimelineAnalysisEntity;
}
