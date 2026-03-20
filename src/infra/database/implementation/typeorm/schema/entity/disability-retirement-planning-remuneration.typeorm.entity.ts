import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { DisabilityRetirementPlanningTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning.typeorm.entity';
import { DateOnlyTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date-only.transformer';

@Entity({ name: 'disability_retirement_planning_remuneration' })
export class DisabilityRetirementPlanningRemunerationTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'remuneration_date',
    type: 'date',
    transformer: DateOnlyTransformer,
  })
  public remunerationDate: Date;

  @Column({
    name: 'remuneration_amount',
    type: 'decimal',
    precision: 15,
    scale: 2,
  })
  public remunerationAmount: string;

  @ManyToOne(
    () => DisabilityRetirementPlanningTypeormEntity,
    (entity) => entity.disabilityRetirementPlanningRemuneration,
  )
  @JoinColumn({ name: 'disability_retirement_planning_id' })
  public disabilityRetirementPlanning?: DisabilityRetirementPlanningTypeormEntity;

  protected override readonly _type =
    DisabilityRetirementPlanningRemunerationTypeormEntity.name;
}
