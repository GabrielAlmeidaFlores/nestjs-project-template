import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RuralTimelineAnalysisPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-period.typeorm.entity';
import { RuralTimelineAnalysisPeriodEconomicAspectTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-economic-aspects/enum/rural-timeline-analysis-period-economic-aspect-type.enum';

@Entity({ name: 'rural_timeline_period_economic_aspects' })
export class RuralTimelineAnalysisPeriodEconomicAspectsTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'type',
    type: 'varchar',
    length: 100,
  })
  public type: RuralTimelineAnalysisPeriodEconomicAspectTypeEnum;

  @Column({
    name: 'content',
    type: 'text',
    nullable: true,
  })
  public content?: string | null;

  @ManyToOne(
    () => RuralTimelineAnalysisPeriodTypeormEntity,
    (entity) => entity.ruralTimelinePeriodEconomicAspects,
  )
  @JoinColumn({ name: 'rural_timeline_period_id' })
  public ruralTimelinePeriod?:
    | RuralTimelineAnalysisPeriodTypeormEntity
    | undefined;

  protected override readonly _type =
    RuralTimelineAnalysisPeriodEconomicAspectsTypeormEntity.name;
}
