import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis-cid.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis-document.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

import type { TemporaryIncapacityBenefitRejectionSevereDiseaseEnum } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis/enum/temporary-incapacity-benefit-rejection-severe-disease.enum';

@Entity({ name: 'temporary_incapacity_benefit_rejection_disability_analysis' })
export class TemporaryIncapacityBenefitRejectionDisabilityAnalysisTypeormEntity extends BaseTypeormEntity {
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
  public severeDisease: TemporaryIncapacityBenefitRejectionSevereDiseaseEnum | null;

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
    () => TemporaryIncapacityBenefitRejectionTypeormEntity,
    (entity) => entity.disabilityAnalysis,
  )
  @JoinColumn({ name: 'temporary_incapacity_benefit_rejection_id' })
  public temporaryIncapacityBenefitRejection?: TemporaryIncapacityBenefitRejectionTypeormEntity;

  @OneToMany(
    () => TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidTypeormEntity,
    (entity) => entity.temporaryIncapacityBenefitRejectionDisabilityAnalysis,
  )
  public cids?: TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidTypeormEntity[];

  @OneToMany(
    () =>
      TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentTypeormEntity,
    (entity) => entity.temporaryIncapacityBenefitRejectionDisabilityAnalysis,
  )
  public documents?: TemporaryIncapacityBenefitRejectionDisabilityAnalysisDocumentTypeormEntity[];

  protected override readonly _type =
    TemporaryIncapacityBenefitRejectionDisabilityAnalysisTypeormEntity.name;
}
