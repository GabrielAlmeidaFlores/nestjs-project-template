import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { GeneralUrbanRetirementGrantAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-analysis-result.typeorm.entity';
import { GeneralUrbanRetirementGrantInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-inss-benefit.typeorm.entity';
import { GeneralUrbanRetirementGrantLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-legal-proceeding.typeorm.entity';
import { GeneralUrbanRetirementGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-period.typeorm.entity';
import { GeneralUrbanRetirementGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-result.typeorm.entity';
import { GeneralUrbanRetirementGrantSpecialPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-special-period.typeorm.entity';
import { GeneralUrbanRetirementGrantTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-time-accelerator.typeorm.entity';

@Entity({ name: 'general_urban_retirement_grant' })
export class GeneralUrbanRetirementGrantTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'cnis_document',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public cnisDocument: string | null;

  @OneToOne(
    () => GeneralUrbanRetirementGrantResultTypeormEntity,
    (entity) => entity.generalUrbanRetirementGrant,
    { nullable: true },
  )
  @JoinColumn({ name: 'general_urban_retirement_grant_result_id' })
  public generalUrbanRetirementGrantResult?:
    | GeneralUrbanRetirementGrantResultTypeormEntity
    | undefined;

  @OneToMany(
    () => GeneralUrbanRetirementGrantInssBenefitTypeormEntity,
    (entity) => entity.generalUrbanRetirementGrant,
  )
  public generalUrbanRetirementGrantBenefit?:
    | GeneralUrbanRetirementGrantInssBenefitTypeormEntity[]
    | undefined;

  @OneToMany(
    () => GeneralUrbanRetirementGrantLegalProceedingTypeormEntity,
    (entity) => entity.generalUrbanRetirementGrant,
  )
  public generalUrbanRetirementGrantLegalProceeding?:
    | GeneralUrbanRetirementGrantLegalProceedingTypeormEntity[]
    | undefined;

  @OneToMany(
    () => GeneralUrbanRetirementGrantPeriodTypeormEntity,
    (entity) => entity.generalUrbanRetirementGrant,
  )
  public generalUrbanRetirementGrantPeriod?:
    | GeneralUrbanRetirementGrantPeriodTypeormEntity[]
    | undefined;

  @OneToMany(
    () => GeneralUrbanRetirementGrantAnalysisResultTypeormEntity,
    (entity) => entity.generalUrbanRetirementGrant,
  )
  public generalUrbanRetirementGrantAnalysisResult?:
    | GeneralUrbanRetirementGrantAnalysisResultTypeormEntity[]
    | undefined;

  @OneToMany(
    () => GeneralUrbanRetirementGrantTimeAcceleratorTypeormEntity,
    (entity) => entity.generalUrbanRetirementGrant,
  )
  public timeAccelerators?:
    | GeneralUrbanRetirementGrantTimeAcceleratorTypeormEntity[]
    | undefined;

  @OneToMany(
    () => GeneralUrbanRetirementGrantSpecialPeriodTypeormEntity,
    (entity) => entity.generalUrbanRetirementGrant,
  )
  public specialTimePeriods?:
    | GeneralUrbanRetirementGrantSpecialPeriodTypeormEntity[]
    | undefined;

  protected override readonly _type =
    GeneralUrbanRetirementGrantTypeormEntity.name;
}
