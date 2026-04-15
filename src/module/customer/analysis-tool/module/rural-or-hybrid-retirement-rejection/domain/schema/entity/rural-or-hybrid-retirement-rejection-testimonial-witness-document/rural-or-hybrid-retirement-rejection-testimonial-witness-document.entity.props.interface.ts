import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RuralOrHybridRetirementRejectionTestimonialWitnessId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-testimonial-witness/value-object/rural-or-hybrid-retirement-rejection-testimonial-witness-id.value-object';
import type { RuralOrHybridRetirementRejectionTestimonialWitnessDocumentId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-testimonial-witness-document/value-object/rural-or-hybrid-retirement-rejection-testimonial-witness-document-id.value-object';

export interface RuralOrHybridRetirementRejectionTestimonialWitnessDocumentEntityPropsInterface extends BaseEntityPropsInterface<RuralOrHybridRetirementRejectionTestimonialWitnessDocumentId> {
  document?: string | null;
  ruralOrHybridRetirementRejectionTestimonialWitnessId: RuralOrHybridRetirementRejectionTestimonialWitnessId;
}
