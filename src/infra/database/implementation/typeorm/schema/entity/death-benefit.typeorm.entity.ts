import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';

import { DeathBenefitBenefitInstitorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-benefit-institutor.typeorm.entity';
import { DeathBenefitDependentDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-dependent-document.typeorm.entity';
import { DeathBenefitDependentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-dependent.typeorm.entity';
import { DeathBenefitDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-document.typeorm.entity';
import { DeathBenefitInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-inss-benefit.typeorm.entity';
import { DeathBenefitLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-legal-proceeding.typeorm.entity';
import { DeathBenefitLegalRepresentativeTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-legal-representative.typeorm.entity';
import { DeathBenefitPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-period-document.typeorm.entity';
import { DeathBenefitPeriodEarningsHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-period-earnings-history.typeorm.entity';
import { DeathBenefitPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-period.typeorm.entity';
import { DeathBenefitResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-result.typeorm.entity';

@Entity({ name: 'death_benefit' })
export class DeathBenefitTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'analysis_name', type: 'varchar', length: 255, nullable: true })
  public analysisName: string | null;

  @OneToOne(
    () => DeathBenefitResultTypeormEntity,
    (entity) => entity.deathBenefit,
    { nullable: true },
  )
  @JoinColumn({ name: 'death_benefit_result_id' })
  public deathBenefitResult?: DeathBenefitResultTypeormEntity | null | undefined;

  @OneToMany(
    () => DeathBenefitDocumentTypeormEntity,
    (entity) => entity.deathBenefit,
  )
  public deathBenefitDocument?: DeathBenefitDocumentTypeormEntity[] | undefined;

  @OneToMany(
    () => DeathBenefitInssBenefitTypeormEntity,
    (entity) => entity.deathBenefit,
  )
  public deathBenefitInssBenefit?: DeathBenefitInssBenefitTypeormEntity[] | undefined;

  @OneToMany(
    () => DeathBenefitLegalProceedingTypeormEntity,
    (entity) => entity.deathBenefit,
  )
  public deathBenefitLegalProceeding?: DeathBenefitLegalProceedingTypeormEntity[] | undefined;

  @OneToMany(
    () => DeathBenefitLegalRepresentativeTypeormEntity,
    (entity) => entity.deathBenefit,
  )
  public deathBenefitLegalRepresentative?: DeathBenefitLegalRepresentativeTypeormEntity[] | undefined;

  @OneToMany(
    () => DeathBenefitBenefitInstitorTypeormEntity,
    (entity) => entity.deathBenefit,
  )
  public deathBenefitBenefitInstitutor?: DeathBenefitBenefitInstitorTypeormEntity[] | undefined;

  @OneToMany(
    () => DeathBenefitDependentTypeormEntity,
    (entity) => entity.deathBenefit,
  )
  public deathBenefitDependent?: DeathBenefitDependentTypeormEntity[] | undefined;

  @OneToMany(
    () => DeathBenefitDependentDocumentTypeormEntity,
    (entity) => entity.deathBenefitDependent,
  )
  public deathBenefitDependentDocument?: DeathBenefitDependentDocumentTypeormEntity[] | undefined;

  @OneToMany(
    () => DeathBenefitPeriodTypeormEntity,
    (entity) => entity.deathBenefit,
  )
  public deathBenefitPeriod?: DeathBenefitPeriodTypeormEntity[] | undefined;

  @OneToMany(
    () => DeathBenefitPeriodDocumentTypeormEntity,
    (entity) => entity.deathBenefitPeriod,
  )
  public deathBenefitPeriodDocument?: DeathBenefitPeriodDocumentTypeormEntity[] | undefined;

  @OneToMany(
    () => DeathBenefitPeriodEarningsHistoryTypeormEntity,
    (entity) => entity.deathBenefitPeriod,
  )
  public deathBenefitPeriodEarningsHistory?: DeathBenefitPeriodEarningsHistoryTypeormEntity[] | undefined;

  protected override readonly _type = DeathBenefitTypeormEntity.name;
}
