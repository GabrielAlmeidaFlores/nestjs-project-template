import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RuralOrHybridRetirementRejectionDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-document.typeorm.entity';
import { RuralOrHybridRetirementRejectionInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-inss-benefit.typeorm.entity';
import { RuralOrHybridRetirementRejectionLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-legal-proceeding.typeorm.entity';
import { RuralOrHybridRetirementRejectionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-period.typeorm.entity';
import { RuralOrHybridRetirementRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-result.typeorm.entity';
import { RuralOrHybridRetirementRejectionTestimonialWitnessTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-testimonial-witness.typeorm.entity';
import { RuralOrHybridRetirementRejectionTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-time-accelerator.typeorm.entity';
import { RuralOrHybridRetirementRejectionWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-or-hybrid-retirement-rejection-work-period.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { RuralOrHybridRetirementRejectionActivityTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/enum/rural-or-hybrid-retirement-rejection-activity-type.enum';
import { RuralOrHybridRetirementRejectionRequestedBenefitEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-rejection/domain/schema/entity/rural-or-hybrid-retirement-rejection/enum/rural-or-hybrid-retirement-rejection-requested-benefit.enum';

@Entity({ name: 'rural_or_hybrid_retirement_rejection' })
export class RuralOrHybridRetirementRejectionTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'analysis_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public analysisName: string | null;

  @Column({
    name: 'activity_type',
    type: 'simple-enum',
    enum: RuralOrHybridRetirementRejectionActivityTypeEnum,
    nullable: true,
  })
  public activityType: RuralOrHybridRetirementRejectionActivityTypeEnum | null;

  @Column({
    name: 'application_submission_date',
    type: 'date',
    transformer: DateOnlyTransformer,
    nullable: true,
  })
  public applicationSubmissionDate: Date | null;

  @Column({
    name: 'requested_benefit',
    type: 'simple-enum',
    enum: RuralOrHybridRetirementRejectionRequestedBenefitEnum,
    nullable: true,
  })
  public requestedBenefit: RuralOrHybridRetirementRejectionRequestedBenefitEnum | null;

  @Column({
    name: 'date_of_rejection',
    type: 'date',
    transformer: DateOnlyTransformer,
    nullable: true,
  })
  public dateOfRejection: Date | null;

  @OneToOne(
    () => RuralOrHybridRetirementRejectionResultTypeormEntity,
    (entity) => entity.ruralOrHybridRetirementRejection,
    { nullable: true },
  )
  @JoinColumn({ name: 'rural_or_hybrid_retirement_rejection_result_id' })
  public ruralOrHybridRetirementRejectionResult?:
    | RuralOrHybridRetirementRejectionResultTypeormEntity
    | null
    | undefined;

  @OneToMany(
    () => RuralOrHybridRetirementRejectionDocumentTypeormEntity,
    (entity) => entity.ruralOrHybridRetirementRejection,
  )
  public ruralOrHybridRetirementRejectionDocument?:
    | RuralOrHybridRetirementRejectionDocumentTypeormEntity[]
    | undefined;

  @OneToMany(
    () => RuralOrHybridRetirementRejectionInssBenefitTypeormEntity,
    (entity) => entity.ruralOrHybridRetirementRejection,
  )
  public ruralOrHybridRetirementRejectionInssBenefit?:
    | RuralOrHybridRetirementRejectionInssBenefitTypeormEntity[]
    | undefined;

  @OneToMany(
    () => RuralOrHybridRetirementRejectionLegalProceedingTypeormEntity,
    (entity) => entity.ruralOrHybridRetirementRejection,
  )
  public ruralOrHybridRetirementRejectionLegalProceeding?:
    | RuralOrHybridRetirementRejectionLegalProceedingTypeormEntity[]
    | undefined;

  @OneToMany(
    () => RuralOrHybridRetirementRejectionPeriodTypeormEntity,
    (entity) => entity.ruralOrHybridRetirementRejection,
  )
  public ruralOrHybridRetirementRejectionPeriod?:
    | RuralOrHybridRetirementRejectionPeriodTypeormEntity[]
    | undefined;

  @OneToMany(
    () => RuralOrHybridRetirementRejectionTestimonialWitnessTypeormEntity,
    (entity) => entity.ruralOrHybridRetirementRejection,
  )
  public ruralOrHybridRetirementRejectionTestimonialWitness?:
    | RuralOrHybridRetirementRejectionTestimonialWitnessTypeormEntity[]
    | undefined;

  @OneToMany(
    () => RuralOrHybridRetirementRejectionWorkPeriodTypeormEntity,
    (entity) => entity.ruralOrHybridRetirementRejection,
  )
  public ruralOrHybridRetirementRejectionWorkPeriod?:
    | RuralOrHybridRetirementRejectionWorkPeriodTypeormEntity[]
    | undefined;

  @OneToMany(
    () => RuralOrHybridRetirementRejectionTimeAcceleratorTypeormEntity,
    (entity) => entity.ruralOrHybridRetirementRejection,
  )
  public ruralOrHybridRetirementRejectionTimeAccelerator?:
    | RuralOrHybridRetirementRejectionTimeAcceleratorTypeormEntity[]
    | undefined;

  protected override readonly _type =
    RuralOrHybridRetirementRejectionTypeormEntity.name;
}
