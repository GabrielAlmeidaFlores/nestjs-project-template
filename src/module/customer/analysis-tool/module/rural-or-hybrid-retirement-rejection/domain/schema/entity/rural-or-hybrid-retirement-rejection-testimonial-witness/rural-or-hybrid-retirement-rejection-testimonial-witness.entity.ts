import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RuralOrHybridRetirementRejectionTestimonialWitnessId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-testimonial-witness/value-object/rural-or-hybrid-retirement-rejection-testimonial-witness-id.value-object';

import type { RuralOrHybridRetirementRejectionId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/value-object/rural-or-hybrid-retirement-rejection-id.value-object';
import type { RuralOrHybridRetirementRejectionInsuredRelationshipEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-testimonial-witness/enum/rural-or-hybrid-retirement-rejection-insured-relationship.enum';
import type { RuralOrHybridRetirementRejectionTestimonialWitnessEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-testimonial-witness/rural-or-hybrid-retirement-rejection-testimonial-witness.entity.props.interface';

export class RuralOrHybridRetirementRejectionTestimonialWitnessEntity extends BaseEntity<RuralOrHybridRetirementRejectionTestimonialWitnessId> {
  public readonly fullName: string | null;
  public readonly federalDocument: string | null;
  public readonly insuredRelationship: RuralOrHybridRetirementRejectionInsuredRelationshipEnum | null;
  public readonly canTestifyStartDate: Date | null;
  public readonly canTestifyEndDate: Date | null;
  public readonly ruralOrHybridRetirementRejectionId: RuralOrHybridRetirementRejectionId;

  protected readonly _type =
    RuralOrHybridRetirementRejectionTestimonialWitnessEntity.name;

  public constructor(
    props: RuralOrHybridRetirementRejectionTestimonialWitnessEntityPropsInterface,
  ) {
    super(RuralOrHybridRetirementRejectionTestimonialWitnessId, props);
    this.fullName = props.fullName ?? null;
    this.federalDocument = props.federalDocument ?? null;
    this.insuredRelationship = props.insuredRelationship ?? null;
    this.canTestifyStartDate = props.canTestifyStartDate ?? null;
    this.canTestifyEndDate = props.canTestifyEndDate ?? null;
    this.ruralOrHybridRetirementRejectionId =
      props.ruralOrHybridRetirementRejectionId;
  }
}
