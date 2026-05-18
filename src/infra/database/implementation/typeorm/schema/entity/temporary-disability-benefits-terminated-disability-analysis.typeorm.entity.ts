import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-disability-analysis-cid.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-disability-analysis-document.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedPreviousBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-previous-benefit.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

import type { TemporaryDisabilityBenefitsTerminatedSevereDiseaseEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis/enum/temporary-disability-benefits-terminated-severe-disease.enum';

@Entity({
  name: 'temporary_disability_benefits_terminated_disability_analysis',
})
export class TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisTypeormEntity extends BaseTypeormEntity {
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
  public severeDisease: TemporaryDisabilityBenefitsTerminatedSevereDiseaseEnum | null;

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

  @ManyToOne(
    () => TemporaryDisabilityBenefitsTerminatedTypeormEntity,
    (entity) => entity.disabilityAnalysis,
  )
  @JoinColumn({ name: 'temporary_disability_benefits_terminated_id' })
  public temporaryDisabilityBenefitsTerminated?: TemporaryDisabilityBenefitsTerminatedTypeormEntity;

  @OneToMany(
    () =>
      TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidTypeormEntity,
    (entity) => entity.temporaryDisabilityBenefitsTerminatedDisabilityAnalysis,
  )
  public cids?: TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidTypeormEntity[];

  @OneToMany(
    () =>
      TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentTypeormEntity,
    (entity) => entity.temporaryDisabilityBenefitsTerminatedDisabilityAnalysis,
  )
  public documents?: TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisDocumentTypeormEntity[];

  @OneToMany(
    () => TemporaryDisabilityBenefitsTerminatedPreviousBenefitTypeormEntity,
    (entity) => entity.temporaryDisabilityBenefitsTerminatedDisabilityAnalysis,
  )
  public temporaryDisabilityBenefitsTerminatedPreviousBenefit?: TemporaryDisabilityBenefitsTerminatedPreviousBenefitTypeormEntity[];

  protected override readonly _type =
    TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisTypeormEntity.name;
}
