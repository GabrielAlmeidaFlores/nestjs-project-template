import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RuralOrHybridRetirementAnalysisTestimonialWitnessDocumentEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-testimonial-witness-document/rural-or-hybrid-retirement-analysis-testimonial-witness-document.entity';
import type { RuralOrHybridRetirementAnalysisTestimonialWitnessDocumentId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-testimonial-witness-document/value-object/rural-or-hybrid-retirement-analysis-testimonial-witness-document-id.value-object';

export abstract class RuralOrHybridRetirementAnalysisTestimonialWitnessDocumentCommandRepositoryGateway {
  public abstract createRuralOrHybridRetirementAnalysisTestimonialWitnessDocument(
    props: RuralOrHybridRetirementAnalysisTestimonialWitnessDocumentEntity,
  ): TransactionType;

  public abstract deleteRuralOrHybridRetirementAnalysisTestimonialWitnessDocument(
    id: RuralOrHybridRetirementAnalysisTestimonialWitnessDocumentId,
  ): TransactionType;
}
