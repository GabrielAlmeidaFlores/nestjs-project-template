import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DeathBenefitGrantDependentDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-dependent-document.typeorm.entity';
import { DeathBenefitGrantDependentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-dependent.typeorm.entity';
import { DeathBenefitGrantInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-inss-benefit.typeorm.entity';
import { DeathBenefitGrantInstitorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-institutor.typeorm.entity';
import { DeathBenefitGrantLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-legal-proceeding.typeorm.entity';
import { DeathBenefitGrantLegalRepresentativeTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-legal-representative.typeorm.entity';
import { DeathBenefitGrantPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-period-document.typeorm.entity';
import { DeathBenefitGrantPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-period-earnings-history.typeorm.entity';
import { DeathBenefitGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-period.typeorm.entity';
import { DeathBenefitGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-result.typeorm.entity';
import { DeathBenefitGrantTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-time-accelerator.typeorm.entity';

@Entity({ name: 'death_benefit_grant' })
export class DeathBenefitGrantTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'analysis_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public analysisName: string | null;

  @OneToOne(
    () => DeathBenefitGrantResultTypeormEntity,
    (entity) => entity.deathBenefitGrant,
    { nullable: true },
  )
  @JoinColumn({ name: 'death_benefit_grant_result_id' })
  public deathBenefitGrantResult?:
    | DeathBenefitGrantResultTypeormEntity
    | null
    | undefined;

  @OneToMany(
    () => DeathBenefitGrantInssBenefitTypeormEntity,
    (entity) => entity.deathBenefitGrant,
  )
  public deathBenefitGrantInssBenefit?:
    | DeathBenefitGrantInssBenefitTypeormEntity[]
    | undefined;

  @OneToMany(
    () => DeathBenefitGrantLegalProceedingTypeormEntity,
    (entity) => entity.deathBenefitGrant,
  )
  public deathBenefitGrantLegalProceeding?:
    | DeathBenefitGrantLegalProceedingTypeormEntity[]
    | undefined;

  @OneToMany(
    () => DeathBenefitGrantLegalRepresentativeTypeormEntity,
    (entity) => entity.deathBenefitGrant,
  )
  public deathBenefitGrantLegalRepresentative?:
    | DeathBenefitGrantLegalRepresentativeTypeormEntity[]
    | undefined;

  @OneToMany(
    () => DeathBenefitGrantInstitorTypeormEntity,
    (entity) => entity.deathBenefitGrant,
  )
  public deathBenefitGrantBenefitInstitutor?:
    | DeathBenefitGrantInstitorTypeormEntity[]
    | undefined;

  @OneToMany(
    () => DeathBenefitGrantDependentTypeormEntity,
    (entity) => entity.deathBenefitGrant,
  )
  public deathBenefitGrantDependent?:
    | DeathBenefitGrantDependentTypeormEntity[]
    | undefined;

  @OneToMany(
    () => DeathBenefitGrantDependentDocumentTypeormEntity,
    (entity) => entity.deathBenefitGrantDependent,
  )
  public deathBenefitGrantDependentDocument?:
    | DeathBenefitGrantDependentDocumentTypeormEntity[]
    | undefined;

  @OneToMany(
    () => DeathBenefitGrantPeriodTypeormEntity,
    (entity) => entity.deathBenefitGrant,
  )
  public deathBenefitGrantPeriod?:
    | DeathBenefitGrantPeriodTypeormEntity[]
    | undefined;

  @OneToMany(
    () => DeathBenefitGrantPeriodDocumentTypeormEntity,
    (entity) => entity.deathBenefitGrantPeriod,
  )
  public deathBenefitGrantPeriodDocument?:
    | DeathBenefitGrantPeriodDocumentTypeormEntity[]
    | undefined;

  @OneToMany(
    () => DeathBenefitGrantPeriodEarningsHistoryTypeormEntity,
    (entity) => entity.deathBenefitGrantPeriod,
  )
  public deathBenefitGrantPeriodEarningsHistory?:
    | DeathBenefitGrantPeriodEarningsHistoryTypeormEntity[]
    | undefined;

  @OneToMany(
    () => DeathBenefitGrantTimeAcceleratorTypeormEntity,
    (entity) => entity.deathBenefitGrant,
  )
  public deathBenefitGrantTimeAccelerator?:
    | DeathBenefitGrantTimeAcceleratorTypeormEntity[]
    | undefined;

  protected override readonly _type = DeathBenefitGrantTypeormEntity.name;
}
