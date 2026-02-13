import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RetirementPlanningRppsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps.typeorm.entity';
import { DateTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date.transformer';

@Entity({ name: 'retirement_planning_rpps_remuneration' })
export class RetirementPlanningRppsRemunerationTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'remuneration_date',
    type: 'date',
    transformer: DateTransformer,
    nullable: false,
  })
  public remunerationDate: Date;

  @Column({
    name: 'remuneration_amount',
    type: 'decimal',
    precision: 15,
    scale: 2,
    nullable: false,
  })
  public remunerationAmount: string;

  @ManyToOne(
    () => RetirementPlanningRppsTypeormEntity,
    (entity) => entity.remunerations,
  )
  @JoinColumn({ name: 'retirement_planning_rpps_id' })
  public retirementPlanningRpps?:
    | RetirementPlanningRppsTypeormEntity
    | undefined;

  protected override readonly _type =
    RetirementPlanningRppsRemunerationTypeormEntity.name;
}
