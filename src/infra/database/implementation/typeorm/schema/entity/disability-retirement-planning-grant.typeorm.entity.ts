import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DisabilityRetirementPlanningGrantDisabilityPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-disability-period.typeorm.entity';
import { DisabilityRetirementPlanningGrantDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-document.typeorm.entity';
import { DisabilityRetirementPlanningGrantInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-inss-benefit.typeorm.entity';
import { DisabilityRetirementPlanningGrantLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-legal-proceeding.typeorm.entity';
import { DisabilityRetirementPlanningGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-period.typeorm.entity';
import { DisabilityRetirementPlanningGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-result.typeorm.entity';
import { DisabilityRetirementPlanningGrantTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-time-accelerator.typeorm.entity';
import { DisabilityRetirementPlanningGrantCategoryEnum } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/enum/disability-retirement-planning-grant-category.enum';

@Entity({ name: 'disability_retirement_planning_grant' })
export class DisabilityRetirementPlanningGrantTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'category',
    type: 'simple-enum',
    enum: DisabilityRetirementPlanningGrantCategoryEnum,
  })
  public category: DisabilityRetirementPlanningGrantCategoryEnum;

  @Column({
    name: 'analysis_name',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public analysisName: string | null;

  @Column({
    name: 'long_prize_disability',
    type: 'boolean',
  })
  public longPrizeDisability: boolean;

  @OneToOne(
    () => DisabilityRetirementPlanningGrantResultTypeormEntity,
    (entity) => entity.disabilityRetirementPlanningGrant,
    { nullable: true },
  )
  @JoinColumn({ name: 'disability_retirement_planning_grant_result_id' })
  public disabilityRetirementPlanningGrantResult?:
    | DisabilityRetirementPlanningGrantResultTypeormEntity
    | null
    | undefined;

  @OneToMany(
    () => DisabilityRetirementPlanningGrantDocumentTypeormEntity,
    (entity) => entity.disabilityRetirementPlanningGrant,
  )
  public disabilityRetirementPlanningGrantDocument?:
    | DisabilityRetirementPlanningGrantDocumentTypeormEntity[]
    | undefined;

  @OneToMany(
    () => DisabilityRetirementPlanningGrantInssBenefitTypeormEntity,
    (entity) => entity.disabilityRetirementPlanningGrant,
  )
  public disabilityRetirementPlanningGrantInssBenefit?:
    | DisabilityRetirementPlanningGrantInssBenefitTypeormEntity[]
    | undefined;

  @OneToMany(
    () => DisabilityRetirementPlanningGrantLegalProceedingTypeormEntity,
    (entity) => entity.disabilityRetirementPlanningGrant,
  )
  public disabilityRetirementPlanningGrantLegalProceeding?:
    | DisabilityRetirementPlanningGrantLegalProceedingTypeormEntity[]
    | undefined;

  @OneToMany(
    () => DisabilityRetirementPlanningGrantPeriodTypeormEntity,
    (entity) => entity.disabilityRetirementPlanningGrant,
  )
  public disabilityRetirementPlanningGrantPeriod?:
    | DisabilityRetirementPlanningGrantPeriodTypeormEntity[]
    | undefined;

  @OneToMany(
    () => DisabilityRetirementPlanningGrantDisabilityPeriodTypeormEntity,
    (entity) => entity.disabilityRetirementPlanningGrant,
  )
  public disabilityRetirementPlanningGrantDisabilityPeriod?:
    | DisabilityRetirementPlanningGrantDisabilityPeriodTypeormEntity[]
    | undefined;

  @OneToMany(
    () => DisabilityRetirementPlanningGrantTimeAcceleratorTypeormEntity,
    (entity) => entity.disabilityRetirementPlanningGrant,
  )
  public disabilityRetirementPlanningGrantTimeAccelerator?:
    | DisabilityRetirementPlanningGrantTimeAcceleratorTypeormEntity[]
    | undefined;

  protected override readonly _type =
    DisabilityRetirementPlanningGrantTypeormEntity.name;
}
