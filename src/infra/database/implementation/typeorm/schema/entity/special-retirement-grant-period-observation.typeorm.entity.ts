import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { SpecialRetirementGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-period.typeorm.entity';

@Entity({ name: 'special_retirement_grant_period_observation' })
export class SpecialRetirementGrantPeriodObservationTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'observation',
    type: 'longtext',
  })
  public observation: string;

  @ManyToOne(() => SpecialRetirementGrantPeriodTypeormEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'special_retirement_grant_period_id' })
  public specialRetirementGrantPeriod?: SpecialRetirementGrantPeriodTypeormEntity | null;

  protected override readonly _type =
    SpecialRetirementGrantPeriodObservationTypeormEntity.name;
}
