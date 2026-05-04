import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-disability-analysis-cid.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-disability-analysis-document.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

import type { TemporaryIncapacityBenefitTerminationSevereDiseaseEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-disability-analysis/enum/temporary-incapacity-benefit-termination-severe-disease.enum';

@Entity({
  name: 'temporary_incapacity_benefit_termination_disability_analysis',
})
export class TemporaryIncapacityBenefitTerminationDisabilityAnalysisTypeormEntity extends BaseTypeormEntity {
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
  public severeDisease: TemporaryIncapacityBenefitTerminationSevereDiseaseEnum | null;

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
    () => TemporaryIncapacityBenefitTerminationTypeormEntity,
    (entity) => entity.disabilityAnalysis,
  )
  @JoinColumn({ name: 'temporary_incapacity_benefit_termination_id' })
  public temporaryIncapacityBenefitTermination?: TemporaryIncapacityBenefitTerminationTypeormEntity;

  @OneToMany(
    () =>
      TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidTypeormEntity,
    (entity) => entity.temporaryIncapacityBenefitTerminationDisabilityAnalysis,
  )
  public cids?: TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidTypeormEntity[];

  @OneToMany(
    () =>
      TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentTypeormEntity,
    (entity) => entity.temporaryIncapacityBenefitTerminationDisabilityAnalysis,
  )
  public documents?: TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentTypeormEntity[];

  protected override readonly _type =
    TemporaryIncapacityBenefitTerminationDisabilityAnalysisTypeormEntity.name;
}
