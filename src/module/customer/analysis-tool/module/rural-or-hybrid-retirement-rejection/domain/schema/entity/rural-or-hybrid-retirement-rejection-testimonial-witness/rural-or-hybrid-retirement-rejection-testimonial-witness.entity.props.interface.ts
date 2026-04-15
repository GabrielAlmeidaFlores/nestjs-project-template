import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';

import type { RuralOrHybridRetirementRejectionTestimonialWitnessId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-testimonial-witness/value-object/rural-or-hybrid-retirement-rejection-testimonial-witness-id.value-object';
import type { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';
import type { RuralOrHybridRetirementRejectionInsuredRelationshipEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-testimonial-witness/enum/rural-or-hybrid-retirement-rejection-insured-relationship.enum';

export interface RuralOrHybridRetirementRejectionTestimonialWitnessEntityPropsInterface
  extends BaseEntityPropsInterface<RuralOrHybridRetirementRejectionTestimonialWitnessId> {
  fullName?: string | null;
  federalDocument?: string | null;
  insuredRelationship?: RuralOrHybridRetirementRejectionInsuredRelationshipEnum | null;
  canTestifyStartDate?: Date | null;
  canTestifyEndDate?: Date | null;
  ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId;
}
