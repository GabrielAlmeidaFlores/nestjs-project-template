import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RetirementPlanningRgpsInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps-inss-benefit.typeorm.entity';
import { RetirementPlanningRgpsLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps-legal-proceeding.typeorm.entity';
import { RetirementPlanningRgpsPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps-period.typeorm.entity';
import { RetirementPlanningRgpsResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps-result.typeorm.entity';

@Entity({ name: 'retirement_planning_rgps' })
export class RetirementPlanningRgpsTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'cnis_document',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  public cnisDocument: string | null;

  @OneToOne(
    () => RetirementPlanningRgpsResultTypeormEntity,
    (entity) => entity.retirementPlanningRgps,
    { nullable: true },
  )
  @JoinColumn({ name: 'retirement_planning_rgps_result_id' })
  public retirementPlanningRgpsResult?:
    | RetirementPlanningRgpsResultTypeormEntity
    | undefined;

  @OneToMany(
    () => RetirementPlanningRgpsInssBenefitTypeormEntity,
    (entity) => entity.retirementPlanningRgps,
  )
  public retirementPlanningRgpsBenefit?:
    | RetirementPlanningRgpsInssBenefitTypeormEntity[]
    | undefined;

  @OneToMany(
    () => RetirementPlanningRgpsLegalProceedingTypeormEntity,
    (entity) => entity.retirementPlanningRgps,
  )
  public retirementPlanningRgpsLegalProceeding?:
    | RetirementPlanningRgpsLegalProceedingTypeormEntity[]
    | undefined;

  @OneToMany(
    () => RetirementPlanningRgpsPeriodTypeormEntity,
    (entity) => entity.retirementPlanningRgps,
  )
  public retirementPlanningRgpsPeriod?:
    | RetirementPlanningRgpsPeriodTypeormEntity[]
    | undefined;

  protected override readonly _type = RetirementPlanningRgpsTypeormEntity.name;
}
