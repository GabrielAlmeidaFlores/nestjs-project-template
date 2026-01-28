import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RuralTimelinePeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-period.typeorm.entity';
import { RuralTimelinePeriodEconomicAspectTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline/domain/schema/entity/rural-timeline-period-economic-aspects/enum/rural-timeline-period-economic-aspect-type.enum';

@Entity({ name: 'rural_timeline_period_economic_aspects' })
export class RuralTimelinePeriodEconomicAspectsTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'type',
    type: 'varchar',
    length: 100,
  })
  public type: RuralTimelinePeriodEconomicAspectTypeEnum;

  @Column({
    name: 'content',
    type: 'text',
    nullable: true,
  })
  public content?: string | null;

  @ManyToOne(
    () => RuralTimelinePeriodTypeormEntity,
    (entity) => entity.ruralTimelinePeriodEconomicAspects,
  )
  @JoinColumn({ name: 'rural_timeline_period_id' })
  public ruralTimelinePeriod: RuralTimelinePeriodTypeormEntity | undefined;

  protected override readonly _type =
    RuralTimelinePeriodEconomicAspectsTypeormEntity.name;
}
