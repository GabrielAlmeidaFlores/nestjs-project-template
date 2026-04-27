import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RuralOrHybridRetirementAnalysisTestimonialWitnessEntity } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-testimonial-witness/rural-or-hybrid-retirement-analysis-testimonial-witness.entity';
import type { RuralOrHybridRetirementAnalysisTestimonialWitnessId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-testimonial-witness/value-object/rural-or-hybrid-retirement-analysis-testimonial-witness-id.value-object';

export abstract class RuralOrHybridRetirementAnalysisTestimonialWitnessCommandRepositoryGateway {
  public abstract createRuralOrHybridRetirementAnalysisTestimonialWitness(
    props: RuralOrHybridRetirementAnalysisTestimonialWitnessEntity,
  ): TransactionType;

  public abstract updateRuralOrHybridRetirementAnalysisTestimonialWitness(
    id: RuralOrHybridRetirementAnalysisTestimonialWitnessId,
    props: RuralOrHybridRetirementAnalysisTestimonialWitnessEntity,
  ): TransactionType;

  public abstract deleteRuralOrHybridRetirementAnalysisTestimonialWitness(
    id: RuralOrHybridRetirementAnalysisTestimonialWitnessId,
  ): TransactionType;
}
