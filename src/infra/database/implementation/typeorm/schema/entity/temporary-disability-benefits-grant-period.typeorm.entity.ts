import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-period-document.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantPreviousBenefitsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-previous-benefits.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';
import { TemporaryDisabilityBenefitsGrantSevereDiseaseEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-period/enum/temporary-disability-benefits-grant-severe-disease.enum';

@Entity({ name: 'temporary_disability_benefits_grant_period' })
export class TemporaryDisabilityBenefitsGrantPeriodTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'start_date',
    type: 'date',
    transformer: DateOnlyTransformer,
  })
  public startDate: Date;

  @Column({
    name: 'cid_ten_id',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public cidTenId: string | null;

  @Column({
    name: 'description',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public description: string | null;

  @Column({
    name: 'job_derivated_disability',
    type: 'boolean',
  })
  public jobDerivatedDisability: boolean;

  @Column({
    name: 'disabling_condition_description',
    type: 'text',
    nullable: true,
  })
  public disablingConditionDescription: string | null;

  @Column({
    name: 'disability_from_severe_disease',
    type: 'boolean',
  })
  public disabilityFromSevereDisease: boolean;

  @Column({
    name: 'severe_disease',
    type: 'simple-enum',
    enum: TemporaryDisabilityBenefitsGrantSevereDiseaseEnum,
    nullable: true,
  })
  public severeDisease: TemporaryDisabilityBenefitsGrantSevereDiseaseEnum | null;

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

  @ManyToOne(
    () => TemporaryDisabilityBenefitsGrantTypeormEntity,
    (entity) => entity.temporaryDisabilityBenefitsGrantPeriod,
    { nullable: true },
  )
  @JoinColumn({ name: 'temporary_disability_benefits_grant_id' })
  public temporaryDisabilityBenefitsGrant?: TemporaryDisabilityBenefitsGrantTypeormEntity | null;

  @OneToMany(
    () => TemporaryDisabilityBenefitsGrantPeriodDocumentTypeormEntity,
    (entity) => entity.temporaryDisabilityBenefitsGrantPeriod,
  )
  public temporaryDisabilityBenefitsGrantPeriodDocument?:
    | TemporaryDisabilityBenefitsGrantPeriodDocumentTypeormEntity[]
    | undefined;

  @OneToMany(
    () => TemporaryDisabilityBenefitsGrantPreviousBenefitsTypeormEntity,
    (entity) => entity.temporaryDisabilityBenefitsGrantPeriod,
  )
  public temporaryDisabilityBenefitsGrantPreviousBenefits?:
    | TemporaryDisabilityBenefitsGrantPreviousBenefitsTypeormEntity[]
    | undefined;

  protected override readonly _type =
    TemporaryDisabilityBenefitsGrantPeriodTypeormEntity.name;
}
