import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RuralOrHybridRetirementAnalysisTestimonialWitnessId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-testimonial-witness/value-object/rural-or-hybrid-retirement-analysis-testimonial-witness-id.value-object';
import type { RuralOrHybridRetirementAnalysisTestimonialWitnessDocumentId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-testimonial-witness-document/value-object/rural-or-hybrid-retirement-analysis-testimonial-witness-document-id.value-object';

export interface RuralOrHybridRetirementAnalysisTestimonialWitnessDocumentEntityPropsInterface extends BaseEntityPropsInterface<RuralOrHybridRetirementAnalysisTestimonialWitnessDocumentId> {
  document?: string | null;
  ruralOrHybridRetirementAnalysisTestimonialWitnessId: RuralOrHybridRetirementAnalysisTestimonialWitnessId;
}
