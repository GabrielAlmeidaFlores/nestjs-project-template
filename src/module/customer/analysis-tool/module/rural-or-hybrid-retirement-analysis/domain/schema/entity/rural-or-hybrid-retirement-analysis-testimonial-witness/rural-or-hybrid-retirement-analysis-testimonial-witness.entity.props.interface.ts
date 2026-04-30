import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RuralOrHybridRetirementAnalysisId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/value-object/rural-or-hybrid-retirement-analysis-id.value-object';
import type { RuralOrHybridRetirementAnalysisInsuredRelationshipEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-testimonial-witness/enum/rural-or-hybrid-retirement-analysis-insured-relationship.enum';
import type { RuralOrHybridRetirementAnalysisTestimonialWitnessId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-testimonial-witness/value-object/rural-or-hybrid-retirement-analysis-testimonial-witness-id.value-object';

export interface RuralOrHybridRetirementAnalysisTestimonialWitnessEntityPropsInterface extends BaseEntityPropsInterface<RuralOrHybridRetirementAnalysisTestimonialWitnessId> {
  fullName?: string | null;
  federalDocument?: string | null;
  insuredRelationship?: RuralOrHybridRetirementAnalysisInsuredRelationshipEnum | null;
  canTestifyStartDate?: Date | null;
  canTestifyEndDate?: Date | null;
  ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId;
}
