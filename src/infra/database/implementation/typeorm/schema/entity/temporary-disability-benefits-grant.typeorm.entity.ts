import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-document.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-inss-benefit.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantInsuredStatusTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-insured-status.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-legal-proceeding.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-period.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-result.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantWorkPeriodsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-work-periods.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantCategoryEnum } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant/enum/temporary-disability-benefits-grant-category.enum';

@Entity({ name: 'temporary_disability_benefits_grant' })
export class TemporaryDisabilityBenefitsGrantTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'category',
    type: 'simple-enum',
    enum: TemporaryDisabilityBenefitsGrantCategoryEnum,
  })
  public category: TemporaryDisabilityBenefitsGrantCategoryEnum;

  @Column({
    name: 'analysis_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public analysisName: string | null;

  @OneToOne(
    () => TemporaryDisabilityBenefitsGrantResultTypeormEntity,
    (entity) => entity.temporaryDisabilityBenefitsGrant,
    { nullable: true },
  )
  @JoinColumn({ name: 'temporary_disability_benefits_grant_result_id' })
  public temporaryDisabilityBenefitsGrantResult?:
    | TemporaryDisabilityBenefitsGrantResultTypeormEntity
    | null
    | undefined;

  @OneToMany(
    () => TemporaryDisabilityBenefitsGrantDocumentTypeormEntity,
    (entity) => entity.temporaryDisabilityBenefitsGrant,
  )
  public temporaryDisabilityBenefitsGrantDocument?:
    | TemporaryDisabilityBenefitsGrantDocumentTypeormEntity[]
    | undefined;

  @OneToMany(
    () => TemporaryDisabilityBenefitsGrantInssBenefitTypeormEntity,
    (entity) => entity.temporaryDisabilityBenefitsGrant,
  )
  public temporaryDisabilityBenefitsGrantInssBenefit?:
    | TemporaryDisabilityBenefitsGrantInssBenefitTypeormEntity[]
    | undefined;

  @OneToMany(
    () => TemporaryDisabilityBenefitsGrantLegalProceedingTypeormEntity,
    (entity) => entity.temporaryDisabilityBenefitsGrant,
  )
  public temporaryDisabilityBenefitsGrantLegalProceeding?:
    | TemporaryDisabilityBenefitsGrantLegalProceedingTypeormEntity[]
    | undefined;

  @OneToMany(
    () => TemporaryDisabilityBenefitsGrantInsuredStatusTypeormEntity,
    (entity) => entity.temporaryDisabilityBenefitsGrant,
  )
  public temporaryDisabilityBenefitsGrantInsuredStatus?:
    | TemporaryDisabilityBenefitsGrantInsuredStatusTypeormEntity[]
    | undefined;

  @OneToMany(
    () => TemporaryDisabilityBenefitsGrantPeriodTypeormEntity,
    (entity) => entity.temporaryDisabilityBenefitsGrant,
  )
  public temporaryDisabilityBenefitsGrantPeriod?:
    | TemporaryDisabilityBenefitsGrantPeriodTypeormEntity[]
    | undefined;

  @OneToMany(
    () => TemporaryDisabilityBenefitsGrantWorkPeriodsTypeormEntity,
    (entity) => entity.temporaryDisabilityBenefitsGrant,
  )
  public temporaryDisabilityBenefitsGrantWorkPeriods?:
    | TemporaryDisabilityBenefitsGrantWorkPeriodsTypeormEntity[]
    | undefined;

  protected override readonly _type =
    TemporaryDisabilityBenefitsGrantTypeormEntity.name;
}
