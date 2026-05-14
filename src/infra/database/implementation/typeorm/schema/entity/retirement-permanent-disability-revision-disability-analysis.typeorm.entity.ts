import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-disability-analysis-associated-cid.typeorm.entity';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-disability-analysis-benefit.typeorm.entity';
import { RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-disability-analysis-document.typeorm.entity';
import { RetirementPermanentDisabilityRevisionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({ name: 'retirement_per_dis_rev_dis_analysis' })
export class RetirementPermanentDisabilityRevisionDisabilityAnalysisTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'estimated_incapacity_start_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public estimatedIncapacityStartDate: Date | null;

  @Column({ name: 'medical_description', type: 'text', nullable: true })
  public medicalDescription: string | null;

  @Column({ name: 'is_accident_related', type: 'boolean', nullable: true })
  public isAccidentRelated: boolean | null;

  @Column({ name: 'accident_description', type: 'text', nullable: true })
  public accidentDescription: string | null;

  @Column({ name: 'is_severe_disease', type: 'boolean', nullable: true })
  public isSevereDisease: boolean | null;

  @Column({
    name: 'severe_disease_type',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public severeDiseaseType: string | null;

  @Column({
    name: 'severe_disease_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public severeDiseaseName: string | null;

  @Column({
    name: 'disease_start_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public diseaseStartDate: Date | null;

  @Column({
    name: 'needs_permanent_assistance',
    type: 'boolean',
    nullable: true,
  })
  public needsPermanentAssistance: boolean | null;

  @ManyToOne(
    () => RetirementPermanentDisabilityRevisionTypeormEntity,
    (entity) => entity.retirementPermanentDisabilityRevisionDisabilityAnalysis,
  )
  @JoinColumn({
    name: 'retirement_permanent_disability_revision_id',
  })
  public retirementPermanentDisabilityRevision?:
    | RetirementPermanentDisabilityRevisionTypeormEntity
    | undefined;

  @OneToMany(
    () =>
      RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidTypeormEntity,
    (entity) => entity.retirementPermanentDisabilityRevisionDisabilityAnalysis,
  )
  public retirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCid?:
    | RetirementPermanentDisabilityRevisionDisabilityAnalysisAssociatedCidTypeormEntity[]
    | undefined;

  @OneToMany(
    () =>
      RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitTypeormEntity,
    (entity) => entity.retirementPermanentDisabilityRevisionDisabilityAnalysis,
  )
  public retirementPermanentDisabilityRevisionDisabilityAnalysisBenefit?:
    | RetirementPermanentDisabilityRevisionDisabilityAnalysisBenefitTypeormEntity[]
    | undefined;

  @OneToMany(
    () =>
      RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentTypeormEntity,
    (entity) => entity.retirementPermanentDisabilityRevisionDisabilityAnalysis,
  )
  public retirementPermanentDisabilityRevisionDisabilityAnalysisDocument?:
    | RetirementPermanentDisabilityRevisionDisabilityAnalysisDocumentTypeormEntity[]
    | undefined;

  protected override readonly _type =
    RetirementPermanentDisabilityRevisionDisabilityAnalysisTypeormEntity.name;
}
