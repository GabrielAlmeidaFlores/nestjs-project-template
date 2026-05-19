import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RetirementPermanentDisabilityRejectionDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-document.typeorm.entity';
import { RetirementPermanentDisabilityRejectionIncapacityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-incapacity.typeorm.entity';
import { RetirementPermanentDisabilityRejectionInsuredQualityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-insured-quality.typeorm.entity';
import { RetirementPermanentDisabilityRejectionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-period.typeorm.entity';
import { RetirementPermanentDisabilityRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-result.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { RetirementPermanentDisabilityRejectionCategoryEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection/enum/retirement-permanent-disability-rejection-category.enum';

@Entity({ name: 'retirement_permanent_disability_rejection' })
export class RetirementPermanentDisabilityRejectionTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'analysis_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public analysisName: string | null;

  @Column({
    name: 'request_entry_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public requestEntryDate: Date | null;

  @Column({
    name: 'denial_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public denialDate: Date | null;

  @Column({
    name: 'category',
    type: 'simple-enum',
    enum: RetirementPermanentDisabilityRejectionCategoryEnum,
    nullable: true,
  })
  public category: RetirementPermanentDisabilityRejectionCategoryEnum | null;

  @OneToOne(
    () => RetirementPermanentDisabilityRejectionResultTypeormEntity,
    (entity) => entity.retirementPermanentDisabilityRejection,
    { nullable: true },
  )
  @JoinColumn({
    name: 'retirement_permanent_disability_rejection_result_id',
  })
  public retirementPermanentDisabilityRejectionResult?: RetirementPermanentDisabilityRejectionResultTypeormEntity | null;

  @OneToOne(
    () => RetirementPermanentDisabilityRejectionIncapacityTypeormEntity,
    (entity) => entity.retirementPermanentDisabilityRejection,
    { nullable: true },
  )
  @JoinColumn({
    name: 'retirement_permanent_disability_rejection_incapacity_id',
  })
  public retirementPermanentDisabilityRejectionIncapacity?: RetirementPermanentDisabilityRejectionIncapacityTypeormEntity | null;

  @OneToOne(
    () => RetirementPermanentDisabilityRejectionInsuredQualityTypeormEntity,
    (entity) => entity.retirementPermanentDisabilityRejection,
    { nullable: true },
  )
  @JoinColumn({
    name: 'retirement_permanent_disability_rejection_insured_quality_id',
  })
  public retirementPermanentDisabilityRejectionInsuredQuality?: RetirementPermanentDisabilityRejectionInsuredQualityTypeormEntity | null;

  @OneToMany(
    () => RetirementPermanentDisabilityRejectionDocumentTypeormEntity,
    (entity) => entity.retirementPermanentDisabilityRejection,
  )
  public retirementPermanentDisabilityRejectionDocument?: RetirementPermanentDisabilityRejectionDocumentTypeormEntity[];

  @OneToMany(
    () => RetirementPermanentDisabilityRejectionPeriodTypeormEntity,
    (entity) => entity.retirementPermanentDisabilityRejection,
  )
  public retirementPermanentDisabilityRejectionPeriod?: RetirementPermanentDisabilityRejectionPeriodTypeormEntity[];

  protected override readonly _type =
    RetirementPermanentDisabilityRejectionTypeormEntity.name;
}
