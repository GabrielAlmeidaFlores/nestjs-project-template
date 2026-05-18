import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RuralOrHybridRetirementAnalysisTestimonialWitnessTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-testimonial-witness.typeorm.entity';

@Entity({
  name: 'rural_or_hybrid_retirement_analysis_testimonial_witness_doc',
})
export class RuralOrHybridRetirementAnalysisTestimonialWitnessDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar', length: 255, nullable: true })
  public document: string | null;

  @ManyToOne(
    () => RuralOrHybridRetirementAnalysisTestimonialWitnessTypeormEntity,
    (entity) =>
      entity.ruralOrHybridRetirementAnalysisTestimonialWitnessDocument,
  )
  @JoinColumn({
    name: 'rural_or_hybrid_retirement_analysis_testimonial_witness_id',
  })
  public ruralOrHybridRetirementAnalysisTestimonialWitness?:
    | RuralOrHybridRetirementAnalysisTestimonialWitnessTypeormEntity
    | undefined;

  protected override readonly _type =
    RuralOrHybridRetirementAnalysisTestimonialWitnessDocumentTypeormEntity.name;
}
