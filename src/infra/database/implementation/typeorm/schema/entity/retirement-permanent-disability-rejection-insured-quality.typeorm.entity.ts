import { Column, Entity, OneToMany, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RetirementPermanentDisabilityRejectionInsuredQualityDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection-insured-quality-document.typeorm.entity';
import { RetirementPermanentDisabilityRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-rejection.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({ name: 'retirement_permanent_disability_rejection_insured_quality' })
export class RetirementPermanentDisabilityRejectionInsuredQualityTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'is_involuntary_unemployed', type: 'boolean' })
  public isInvoluntaryUnemployed: boolean;

  @Column({
    name: 'intends_to_prove_involuntary_unemployment',
    type: 'boolean',
    nullable: true,
  })
  public intendsToProveInvoluntaryUnemployment: boolean | null;

  @Column({ name: 'is_rural_insured_at_generating_fact', type: 'boolean' })
  public isRuralInsuredAtGeneratingFact: boolean;

  @Column({
    name: 'rural_insured_start_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public ruralInsuredStartDate: Date | null;

  @Column({
    name: 'rural_insured_end_date',
    type: 'date',
    nullable: true,
    transformer: DateOnlyTransformer,
  })
  public ruralInsuredEndDate: Date | null;

  @Column({ name: 'rural_insured_description', type: 'text', nullable: true })
  public ruralInsuredDescription: string | null;

  @OneToOne(
    () => RetirementPermanentDisabilityRejectionTypeormEntity,
    (entity) => entity.retirementPermanentDisabilityRejectionInsuredQuality,
  )
  public retirementPermanentDisabilityRejection?: RetirementPermanentDisabilityRejectionTypeormEntity;

  @OneToMany(
    () =>
      RetirementPermanentDisabilityRejectionInsuredQualityDocumentTypeormEntity,
    (entity) => entity.retirementPermanentDisabilityRejectionInsuredQuality,
  )
  public retirementPermanentDisabilityRejectionInsuredQualityDocument?: RetirementPermanentDisabilityRejectionInsuredQualityDocumentTypeormEntity[];

  protected override readonly _type =
    RetirementPermanentDisabilityRejectionInsuredQualityTypeormEntity.name;
}
