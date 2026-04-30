import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RuralOrHybridRetirementAnalysisTestimonialWitnessDocumentId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-testimonial-witness-document/value-object/rural-or-hybrid-retirement-analysis-testimonial-witness-document-id.value-object';

import type { RuralOrHybridRetirementAnalysisTestimonialWitnessId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-testimonial-witness/value-object/rural-or-hybrid-retirement-analysis-testimonial-witness-id.value-object';
import type { RuralOrHybridRetirementAnalysisTestimonialWitnessDocumentEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-testimonial-witness-document/rural-or-hybrid-retirement-analysis-testimonial-witness-document.entity.props.interface';

export class RuralOrHybridRetirementAnalysisTestimonialWitnessDocumentEntity extends BaseEntity<RuralOrHybridRetirementAnalysisTestimonialWitnessDocumentId> {
  public readonly document: string | null;
  public readonly ruralOrHybridRetirementAnalysisTestimonialWitnessId: RuralOrHybridRetirementAnalysisTestimonialWitnessId;

  protected readonly _type =
    RuralOrHybridRetirementAnalysisTestimonialWitnessDocumentEntity.name;

  public constructor(
    props: RuralOrHybridRetirementAnalysisTestimonialWitnessDocumentEntityPropsInterface,
  ) {
    super(RuralOrHybridRetirementAnalysisTestimonialWitnessDocumentId, props);
    this.document = props.document ?? null;
    this.ruralOrHybridRetirementAnalysisTestimonialWitnessId =
      props.ruralOrHybridRetirementAnalysisTestimonialWitnessId;
  }
}
