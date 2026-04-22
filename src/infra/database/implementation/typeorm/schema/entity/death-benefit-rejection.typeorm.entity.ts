import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DeathBenefitRejectionDependentDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-dependent-document.typeorm.entity';
import { DeathBenefitRejectionDependentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-dependent.typeorm.entity';
import { DeathBenefitRejectionInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-inss-benefit.typeorm.entity';
import { DeathBenefitRejectionInstitorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-institutor.typeorm.entity';
import { DeathBenefitRejectionLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-legal-proceeding.typeorm.entity';
import { DeathBenefitRejectionLegalRepresentativeTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-legal-representative.typeorm.entity';
import { DeathBenefitRejectionPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-period-document.typeorm.entity';
import { DeathBenefitRejectionPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-period-earnings-history.typeorm.entity';
import { DeathBenefitRejectionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-period.typeorm.entity';
import { DeathBenefitRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-result.typeorm.entity';
import { DeathBenefitRejectionTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-time-accelerator.typeorm.entity';
import { DeathBenefitRejectionCategoryEnum } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/enum/death-benefit-rejection-category.enum';

@Entity({ name: 'death_benefit_rejection' })
export class DeathBenefitRejectionTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'analysis_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public analysisName: string | null;

  @Column({
    name: 'category',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  public category: DeathBenefitRejectionCategoryEnum | null;

  @OneToOne(
    () => DeathBenefitRejectionResultTypeormEntity,
    (entity) => entity.deathBenefitRejection,
    { nullable: true },
  )
  @JoinColumn({ name: 'death_benefit_rejection_result_id' })
  public deathBenefitRejectionResult?:
    | DeathBenefitRejectionResultTypeormEntity
    | null
    | undefined;

  @OneToMany(
    () => DeathBenefitRejectionInssBenefitTypeormEntity,
    (entity) => entity.deathBenefitRejection,
  )
  public deathBenefitRejectionInssBenefit?:
    | DeathBenefitRejectionInssBenefitTypeormEntity[]
    | undefined;

  @OneToMany(
    () => DeathBenefitRejectionLegalProceedingTypeormEntity,
    (entity) => entity.deathBenefitRejection,
  )
  public deathBenefitRejectionLegalProceeding?:
    | DeathBenefitRejectionLegalProceedingTypeormEntity[]
    | undefined;

  @OneToMany(
    () => DeathBenefitRejectionLegalRepresentativeTypeormEntity,
    (entity) => entity.deathBenefitRejection,
  )
  public deathBenefitRejectionLegalRepresentative?:
    | DeathBenefitRejectionLegalRepresentativeTypeormEntity[]
    | undefined;

  @OneToMany(
    () => DeathBenefitRejectionInstitorTypeormEntity,
    (entity) => entity.deathBenefitRejection,
  )
  public deathBenefitRejectionBenefitInstitutor?:
    | DeathBenefitRejectionInstitorTypeormEntity[]
    | undefined;

  @OneToMany(
    () => DeathBenefitRejectionDependentTypeormEntity,
    (entity) => entity.deathBenefitRejection,
  )
  public deathBenefitRejectionDependent?:
    | DeathBenefitRejectionDependentTypeormEntity[]
    | undefined;

  @OneToMany(
    () => DeathBenefitRejectionDependentDocumentTypeormEntity,
    (entity) => entity.deathBenefitRejectionDependent,
  )
  public deathBenefitRejectionDependentDocument?:
    | DeathBenefitRejectionDependentDocumentTypeormEntity[]
    | undefined;

  @OneToMany(
    () => DeathBenefitRejectionPeriodTypeormEntity,
    (entity) => entity.deathBenefitRejection,
  )
  public deathBenefitRejectionPeriod?:
    | DeathBenefitRejectionPeriodTypeormEntity[]
    | undefined;

  @OneToMany(
    () => DeathBenefitRejectionPeriodDocumentTypeormEntity,
    (entity) => entity.deathBenefitRejectionPeriod,
  )
  public deathBenefitRejectionPeriodDocument?:
    | DeathBenefitRejectionPeriodDocumentTypeormEntity[]
    | undefined;

  @OneToMany(
    () => DeathBenefitRejectionPeriodEarningsHistoryTypeormEntity,
    (entity) => entity.deathBenefitRejectionPeriod,
  )
  public deathBenefitRejectionPeriodEarningsHistory?:
    | DeathBenefitRejectionPeriodEarningsHistoryTypeormEntity[]
    | undefined;

  @OneToMany(
    () => DeathBenefitRejectionTimeAcceleratorTypeormEntity,
    (entity) => entity.deathBenefitRejection,
  )
  public deathBenefitRejectionTimeAccelerator?:
    | DeathBenefitRejectionTimeAcceleratorTypeormEntity[]
    | undefined;

  protected override readonly _type = DeathBenefitRejectionTypeormEntity.name;
}
