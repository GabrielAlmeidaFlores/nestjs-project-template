import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis-cid.typeorm.entity';
import { PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis-document.typeorm.entity';
import { PermanentIncapacityBenefitTerminatedTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

import type { PermanentIncapacityBenefitTerminatedSevereDiseaseEnum } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis/enum/permanent-incapacity-benefit-terminated-severe-disease.enum';

@Entity({
  name: 'permanent_incapacity_benefit_terminated_disability_analysis',
})
export class PermanentIncapacityBenefitTerminatedDisabilityAnalysisTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'estimated_disability_start_date',
    type: 'date',
    transformer: DateOnlyTransformer,
  })
  public estimatedDisabilityStartDate: Date;

  @Column({
    name: 'short_disability_description',
    type: 'text',
    nullable: true,
  })
  public shortDisabilityDescription: string | null;

  @Column({ name: 'disability_from_accident', type: 'boolean' })
  public disabilityFromAccident: boolean;

  @Column({
    name: 'disabling_condition_description',
    type: 'text',
    nullable: true,
  })
  public disablingConditionDescription: string | null;

  @Column({ name: 'disability_from_severe_disease', type: 'boolean' })
  public disabilityFromSevereDisease: boolean;

  @Column({
    name: 'severe_disease',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  public severeDisease: PermanentIncapacityBenefitTerminatedSevereDiseaseEnum | null;

  @Column({
    name: 'disease_custom_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public diseaseCustomName: string | null;

  @Column({
    name: 'disease_start_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public diseaseStartDate: Date | null;

  @Column({
    name: 'needs_constant_assistance_from_another_person',
    type: 'boolean',
  })
  public needsConstantAssistanceFromAnotherPerson: boolean;

  @Column({ name: 'previous_disability_benefit', type: 'boolean' })
  public previousDisabilityBenefit: boolean;

  @Column({
    name: 'previous_benefit_number',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  public previousBenefitNumber: string | null;

  @ManyToOne(
    () => PermanentIncapacityBenefitTerminatedTypeormEntity,
    (entity) => entity.disabilityAnalysis,
  )
  @JoinColumn({ name: 'permanent_incapacity_benefit_terminated_id' })
  public permanentIncapacityBenefitTerminated?: PermanentIncapacityBenefitTerminatedTypeormEntity;

  @OneToMany(
    () =>
      PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidTypeormEntity,
    (entity) => entity.permanentIncapacityBenefitTerminatedDisabilityAnalysis,
  )
  public cids?: PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidTypeormEntity[];

  @OneToMany(
    () =>
      PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentTypeormEntity,
    (entity) => entity.permanentIncapacityBenefitTerminatedDisabilityAnalysis,
  )
  public documents?: PermanentIncapacityBenefitTerminatedDisabilityAnalysisDocumentTypeormEntity[];

  protected override readonly _type =
    PermanentIncapacityBenefitTerminatedDisabilityAnalysisTypeormEntity.name;
}
