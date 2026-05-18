import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RuralOrHybridRetirementAnalysisTestimonialWitnessId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-testimonial-witness/value-object/rural-or-hybrid-retirement-analysis-testimonial-witness-id.value-object';

import type { RuralOrHybridRetirementAnalysisId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/value-object/rural-or-hybrid-retirement-analysis-id.value-object';
import type { RuralOrHybridRetirementAnalysisInsuredRelationshipEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-testimonial-witness/enum/rural-or-hybrid-retirement-analysis-insured-relationship.enum';
import type { RuralOrHybridRetirementAnalysisTestimonialWitnessEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-testimonial-witness/rural-or-hybrid-retirement-analysis-testimonial-witness.entity.props.interface';

export class RuralOrHybridRetirementAnalysisTestimonialWitnessEntity extends BaseEntity<RuralOrHybridRetirementAnalysisTestimonialWitnessId> {
  public readonly fullName: string | null;
  public readonly federalDocument: string | null;
  public readonly insuredRelationship: RuralOrHybridRetirementAnalysisInsuredRelationshipEnum | null;
  public readonly canTestifyStartDate: Date | null;
  public readonly canTestifyEndDate: Date | null;
  public readonly ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId;

  protected readonly _type =
    RuralOrHybridRetirementAnalysisTestimonialWitnessEntity.name;

  public constructor(
    props: RuralOrHybridRetirementAnalysisTestimonialWitnessEntityPropsInterface,
  ) {
    super(RuralOrHybridRetirementAnalysisTestimonialWitnessId, props);
    this.fullName = props.fullName ?? null;
    this.federalDocument = props.federalDocument ?? null;
    this.insuredRelationship = props.insuredRelationship ?? null;
    this.canTestifyStartDate = props.canTestifyStartDate ?? null;
    this.canTestifyEndDate = props.canTestifyEndDate ?? null;
    this.ruralOrHybridRetirementAnalysisId =
      props.ruralOrHybridRetirementAnalysisId;
  }
}
