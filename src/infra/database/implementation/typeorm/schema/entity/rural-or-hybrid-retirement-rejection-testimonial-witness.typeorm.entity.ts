import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RuralOrHybridRetirementRejectionTestimonialWitnessDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-testimonial-witness-document.typeorm.entity';
import { RuralOrHybridRetirementRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { RuralOrHybridRetirementRejectionInsuredRelationshipEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection-testimonial-witness/enum/rural-or-hybrid-retirement-rejection-insured-relationship.enum';

@Entity({ name: 'rural_or_hybrid_retirement_rejection_testimonial_witness' })
export class RuralOrHybridRetirementRejectionTestimonialWitnessTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'full_name', type: 'varchar', length: 255, nullable: true })
  public fullName: string | null;

  @Column({ name: 'federal_document', type: 'varchar', length: 20, nullable: true })
  public federalDocument: string | null;

  @Column({
    name: 'insured_relationship',
    type: 'simple-enum',
    enum: RuralOrHybridRetirementRejectionInsuredRelationshipEnum,
    nullable: true,
  })
  public insuredRelationship: RuralOrHybridRetirementRejectionInsuredRelationshipEnum | null;

  @Column({
    name: 'can_testify_start_date',
    type: 'date',
    transformer: DateOnlyTransformer,
    nullable: true,
  })
  public canTestifyStartDate: Date | null;

  @Column({
    name: 'can_testify_end_date',
    type: 'date',
    transformer: DateOnlyTransformer,
    nullable: true,
  })
  public canTestifyEndDate: Date | null;

  @ManyToOne(
    () => RuralOrHybridRetirementRejectionTypeormEntity,
    (entity) => entity.ruralOrHybridRetirementRejectionTestimonialWitness,
  )
  @JoinColumn({ name: 'rural_or_hybrid_retirement_rejection_id' })
  public ruralOrHybridRetirementRejection?:
    | RuralOrHybridRetirementRejectionTypeormEntity
    | undefined;

  @OneToMany(
    () => RuralOrHybridRetirementRejectionTestimonialWitnessDocumentTypeormEntity,
    (entity) => entity.ruralOrHybridRetirementRejectionTestimonialWitness,
  )
  public ruralOrHybridRetirementRejectionTestimonialWitnessDocument?:
    | RuralOrHybridRetirementRejectionTestimonialWitnessDocumentTypeormEntity[]
    | undefined;

  protected override readonly _type =
    RuralOrHybridRetirementRejectionTestimonialWitnessTypeormEntity.name;
}
