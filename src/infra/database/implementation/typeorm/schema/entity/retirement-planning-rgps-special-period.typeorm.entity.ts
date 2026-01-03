import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RetirementPlanningRgpsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps.typeorm.entity';

@Entity({ name: 'retirement_planning_rgps_special_period' })
export class RetirementPlanningRgpsSpecialPeriodTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'response', type: 'longtext' })
  public response: string;

  @ManyToOne(
    () => RetirementPlanningRgpsTypeormEntity,
    (entity) => entity.specialTimePeriods,
    { nullable: true },
  )
  @JoinColumn({ name: 'retirement_planning_rgps_id' })
  public retirementPlanningRgps?: RetirementPlanningRgpsTypeormEntity | null;

  protected override readonly _type =
    RetirementPlanningRgpsSpecialPeriodTypeormEntity.name;
}
