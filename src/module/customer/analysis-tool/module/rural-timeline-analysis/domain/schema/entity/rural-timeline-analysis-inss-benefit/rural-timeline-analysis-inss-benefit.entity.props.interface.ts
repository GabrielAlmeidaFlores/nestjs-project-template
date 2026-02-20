import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RuralTimelineAnalysisEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/rural-timeline-analysis.entity';
import type { RuralTimelineAnalysisInssBenefitId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-inss-benefit/value-object/rural-timeline-analysis-inss-benefit-id/rural-timeline-analysis-inss-benefit-id.value-object';

export interface RuralTimelineAnalysisInssBenefitEntityPropsInterface extends BaseEntityPropsInterface<RuralTimelineAnalysisInssBenefitId> {
  inssBenefitNumber: string;
  ruralTimelineAnalysis: RuralTimelineAnalysisEntity;
}
