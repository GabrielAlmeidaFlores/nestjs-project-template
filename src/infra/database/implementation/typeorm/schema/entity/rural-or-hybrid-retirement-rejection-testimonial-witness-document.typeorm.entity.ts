import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RuralOrHybridRetirementRejectionTestimonialWitnessTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-testimonial-witness.typeorm.entity';

@Entity({
  name: 'rural_or_hybrid_retirement_rejection_testimonial_witness_document',
})
export class RuralOrHybridRetirementRejectionTestimonialWitnessDocumentTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'document', type: 'varchar', length: 255, nullable: true })
  public document: string | null;

  @ManyToOne(
    () => RuralOrHybridRetirementRejectionTestimonialWitnessTypeormEntity,
    (entity) =>
      entity.ruralOrHybridRetirementRejectionTestimonialWitnessDocument,
  )
  @JoinColumn({
    name: 'rural_or_hybrid_retirement_rejection_testimonial_witness_id',
  })
  public ruralOrHybridRetirementRejectionTestimonialWitness?:
    | RuralOrHybridRetirementRejectionTestimonialWitnessTypeormEntity
    | undefined;

  protected override readonly _type =
    RuralOrHybridRetirementRejectionTestimonialWitnessDocumentTypeormEntity.name;
}
