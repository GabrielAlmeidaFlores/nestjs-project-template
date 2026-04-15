import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';

import type { RuralOrHybridRetirementRejectionTestimonialWitnessEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-testimonial-witness/rural-or-hybrid-retirement-rejection-testimonial-witness.entity';
import type { RuralOrHybridRetirementRejectionTestimonialWitnessId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-testimonial-witness/value-object/rural-or-hybrid-retirement-rejection-testimonial-witness-id.value-object';

export abstract class RuralOrHybridRetirementRejectionTestimonialWitnessCommandRepositoryGateway {
  public abstract createRuralOrHybridRetirementRejectionTestimonialWitness(
    props: RuralOrHybridRetirementRejectionTestimonialWitnessEntity,
  ): TransactionType;

  public abstract updateRuralOrHybridRetirementRejectionTestimonialWitness(
    id: RuralOrHybridRetirementRejectionTestimonialWitnessId,
    props: RuralOrHybridRetirementRejectionTestimonialWitnessEntity,
  ): TransactionType;

  public abstract deleteRuralOrHybridRetirementRejectionTestimonialWitness(
    id: RuralOrHybridRetirementRejectionTestimonialWitnessId,
  ): TransactionType;
}
