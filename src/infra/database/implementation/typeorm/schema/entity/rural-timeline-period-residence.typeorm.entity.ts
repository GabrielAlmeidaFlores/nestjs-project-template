import { Column, Entity, OneToOne } from 'typeorm';

import { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RuralTimelinePeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-period.typeorm.entity';

@Entity({ name: 'rural_timeline_period_residence' })
export class RuralTimelinePeriodResidenceTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'city',
    type: 'varchar',
    length: 255,
  })
  public city: string;

  @Column({
    name: 'state_code',
    type: 'varchar',
    length: 2,
  })
  public stateCode: StateCodeEnum;

  @Column({
    name: 'distance_to_property_km',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  public distanceToPropertyKm: string;

  @OneToOne(
    () => RuralTimelinePeriodTypeormEntity,
    (entity) => entity.ruralTimelinePeriodResidence,
  )
  public ruralTimelinePeriod?: RuralTimelinePeriodTypeormEntity | undefined;

  protected override readonly _type =
    RuralTimelinePeriodResidenceTypeormEntity.name;
}
