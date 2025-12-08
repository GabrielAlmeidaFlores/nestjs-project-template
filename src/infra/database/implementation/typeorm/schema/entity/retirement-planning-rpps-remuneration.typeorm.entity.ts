import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RetirementPlanningRppsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps.typeorm.entity';

@Entity({ name: 'retirement_planning_rpps_remuneration' })
export class RetirementPlanningRppsRemuneration extends BaseTypeormEntity {
  @Column({
    name: 'remuneration_type',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  public date: Date;

  @Column({
    name: 'remuneration_amount',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  public amount: string;

  @ManyToOne(
    () => RetirementPlanningRppsTypeormEntity,
    (entity) => entity.remunerations,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'retirement_planning_rpps_id' })
  public retirementPlanningRpps?:
    | RetirementPlanningRppsTypeormEntity
    | undefined;

  protected override readonly _type = RetirementPlanningRppsRemuneration.name;
}
