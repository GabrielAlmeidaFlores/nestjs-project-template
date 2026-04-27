import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RuralOrHybridRetirementAnalysisTestimonialWitnessDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis-testimonial-witness-document.typeorm.entity';
import { RuralOrHybridRetirementAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-analysis.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { RuralOrHybridRetirementAnalysisInsuredRelationshipEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-testimonial-witness/enum/rural-or-hybrid-retirement-analysis-insured-relationship.enum';

@Entity({ name: 'rural_or_hybrid_retirement_analysis_testimonial_witness' })
export class RuralOrHybridRetirementAnalysisTestimonialWitnessTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'full_name', type: 'varchar', length: 255, nullable: true })
  public fullName: string | null;

  @Column({
    name: 'federal_document',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  public federalDocument: string | null;

  @Column({
    name: 'insured_relationship',
    type: 'simple-enum',
    enum: RuralOrHybridRetirementAnalysisInsuredRelationshipEnum,
    nullable: true,
  })
  public insuredRelationship: RuralOrHybridRetirementAnalysisInsuredRelationshipEnum | null;

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
    () => RuralOrHybridRetirementAnalysisTypeormEntity,
    (entity) => entity.ruralOrHybridRetirementAnalysisTestimonialWitness,
  )
  @JoinColumn({ name: 'rural_or_hybrid_retirement_analysis_id' })
  public ruralOrHybridRetirementAnalysis?:
    | RuralOrHybridRetirementAnalysisTypeormEntity
    | undefined;

  @OneToMany(
    () =>
      RuralOrHybridRetirementAnalysisTestimonialWitnessDocumentTypeormEntity,
    (entity) => entity.ruralOrHybridRetirementAnalysisTestimonialWitness,
  )
  public ruralOrHybridRetirementAnalysisTestimonialWitnessDocument?:
    | RuralOrHybridRetirementAnalysisTestimonialWitnessDocumentTypeormEntity[]
    | undefined;

  protected override readonly _type =
    RuralOrHybridRetirementAnalysisTestimonialWitnessTypeormEntity.name;
}
