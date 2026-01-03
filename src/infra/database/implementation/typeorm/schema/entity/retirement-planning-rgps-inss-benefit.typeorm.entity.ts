import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RetirementPlanningRgpsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps.typeorm.entity';

@Entity({ name: 'retirement_planning_rgps_inss_benefit' })
export class RetirementPlanningRgpsInssBenefitTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'inss_benefit_number',
    type: 'varchar',
    length: 100,
  })
  public inssBenefitNumber: string;

  @ManyToOne(
    () => RetirementPlanningRgpsTypeormEntity,
    (entity) => entity.retirementPlanningRgpsBenefit,
  )
  @JoinColumn({ name: 'retirement_planning_rgps_id' })
  public retirementPlanningRgps:
    | RetirementPlanningRgpsTypeormEntity
    | undefined;

  protected override readonly _type =
    RetirementPlanningRgpsInssBenefitTypeormEntity.name;
}
