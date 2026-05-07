import { Column, Entity, OneToMany, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RetirementPermanentDisabilityRejectionIncapacityCidTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-incapacity-cid.typeorm.entity';
import { RetirementPermanentDisabilityRejectionIncapacityDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-incapacity-document.typeorm.entity';
import { RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-incapacity-previous-benefit.typeorm.entity';
import { RetirementPermanentDisabilityRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { RetirementPermanentDisabilityRejectionSeriousDiseaseEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity/enum/retirement-permanent-disability-rejection-serious-disease.enum';

@Entity({ name: 'retirement_permanent_disability_rejection_incapacity' })
export class RetirementPermanentDisabilityRejectionIncapacityTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'incapacity_start_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public incapacityStartDate: Date | null;

  @Column({ name: 'disease_description', type: 'text', nullable: true })
  public diseaseDescription: string | null;

  @Column({ name: 'is_incapacity_from_accident', type: 'boolean' })
  public isIncapacityFromAccident: boolean;

  @Column({
    name: 'incapacitating_event_description',
    type: 'text',
    nullable: true,
  })
  public incapacitatingEventDescription: string | null;

  @Column({ name: 'is_incapacity_from_serious_disease', type: 'boolean' })
  public isIncapacityFromSeriousDisease: boolean;

  @Column({
    name: 'serious_disease_type',
    type: 'simple-enum',
    enum: RetirementPermanentDisabilityRejectionSeriousDiseaseEnum,
    nullable: true,
  })
  public seriousDiseaseType: RetirementPermanentDisabilityRejectionSeriousDiseaseEnum | null;

  @Column({
    name: 'serious_disease_other_description',
    type: 'text',
    nullable: true,
  })
  public seriousDiseaseOtherDescription: string | null;

  @Column({
    name: 'serious_disease_start_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public seriousDiseaseStartDate: Date | null;

  @Column({ name: 'needs_permanent_assistance', type: 'boolean' })
  public needsPermanentAssistance: boolean;

  @Column({ name: 'has_previous_incapacity_benefit', type: 'boolean' })
  public hasPreviousIncapacityBenefit: boolean;

  @OneToOne(
    () => RetirementPermanentDisabilityRejectionTypeormEntity,
    (entity) => entity.retirementPermanentDisabilityRejectionIncapacity,
  )
  public retirementPermanentDisabilityRejection?: RetirementPermanentDisabilityRejectionTypeormEntity;

  @OneToMany(
    () => RetirementPermanentDisabilityRejectionIncapacityCidTypeormEntity,
    (entity) => entity.retirementPermanentDisabilityRejectionIncapacity,
  )
  public retirementPermanentDisabilityRejectionIncapacityCid?: RetirementPermanentDisabilityRejectionIncapacityCidTypeormEntity[];

  @OneToMany(
    () => RetirementPermanentDisabilityRejectionIncapacityDocumentTypeormEntity,
    (entity) => entity.retirementPermanentDisabilityRejectionIncapacity,
  )
  public retirementPermanentDisabilityRejectionIncapacityDocument?: RetirementPermanentDisabilityRejectionIncapacityDocumentTypeormEntity[];

  @OneToMany(
    () =>
      RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitTypeormEntity,
    (entity) => entity.retirementPermanentDisabilityRejectionIncapacity,
  )
  public retirementPermanentDisabilityRejectionIncapacityPreviousBenefit?: RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitTypeormEntity[];

  protected override readonly _type =
    RetirementPermanentDisabilityRejectionIncapacityTypeormEntity.name;
}
