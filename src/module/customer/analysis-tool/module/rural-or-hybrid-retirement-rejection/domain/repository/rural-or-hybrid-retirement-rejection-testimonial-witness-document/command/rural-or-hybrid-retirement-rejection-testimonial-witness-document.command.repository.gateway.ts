import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RuralOrHybridRetirementRejectionTestimonialWitnessDocumentEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-testimonial-witness-document/rural-or-hybrid-retirement-rejection-testimonial-witness-document.entity';
import type { RuralOrHybridRetirementRejectionTestimonialWitnessDocumentId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-testimonial-witness-document/value-object/rural-or-hybrid-retirement-rejection-testimonial-witness-document-id.value-object';

export abstract class RuralOrHybridRetirementRejectionTestimonialWitnessDocumentCommandRepositoryGateway {
  public abstract createRuralOrHybridRetirementRejectionTestimonialWitnessDocument(
    props: RuralOrHybridRetirementRejectionTestimonialWitnessDocumentEntity,
  ): TransactionType;

  public abstract deleteRuralOrHybridRetirementRejectionTestimonialWitnessDocument(
    id: RuralOrHybridRetirementRejectionTestimonialWitnessDocumentId,
  ): TransactionType;
}
