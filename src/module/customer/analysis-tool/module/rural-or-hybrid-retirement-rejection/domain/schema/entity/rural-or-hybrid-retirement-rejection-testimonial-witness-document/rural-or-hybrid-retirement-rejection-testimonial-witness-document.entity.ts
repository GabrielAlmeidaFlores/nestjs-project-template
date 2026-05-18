import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RuralOrHybridRetirementRejectionTestimonialWitnessDocumentId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-testimonial-witness-document/value-object/rural-or-hybrid-retirement-rejection-testimonial-witness-document-id.value-object';

import type { RuralOrHybridRetirementRejectionTestimonialWitnessId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-testimonial-witness/value-object/rural-or-hybrid-retirement-rejection-testimonial-witness-id.value-object';
import type { RuralOrHybridRetirementRejectionTestimonialWitnessDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-testimonial-witness-document/rural-or-hybrid-retirement-rejection-testimonial-witness-document.entity.props.interface';

export class RuralOrHybridRetirementRejectionTestimonialWitnessDocumentEntity extends BaseEntity<RuralOrHybridRetirementRejectionTestimonialWitnessDocumentId> {
  public readonly document: string | null;
  public readonly ruralOrHybridRetirementRejectionTestimonialWitnessId: RuralOrHybridRetirementRejectionTestimonialWitnessId;

  protected readonly _type =
    RuralOrHybridRetirementRejectionTestimonialWitnessDocumentEntity.name;

  public constructor(
    props: RuralOrHybridRetirementRejectionTestimonialWitnessDocumentEntityPropsInterface,
  ) {
    super(RuralOrHybridRetirementRejectionTestimonialWitnessDocumentId, props);
    this.document = props.document ?? null;
    this.ruralOrHybridRetirementRejectionTestimonialWitnessId =
      props.ruralOrHybridRetirementRejectionTestimonialWitnessId;
  }
}
