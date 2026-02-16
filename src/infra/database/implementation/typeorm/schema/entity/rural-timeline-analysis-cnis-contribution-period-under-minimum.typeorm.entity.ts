import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RuralTimelineAnalysisCnisContributionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-analysis-cnis-contribution-period.typeorm.entity';
import { DateTransformer } from '@infra/database/implementation/typeorm/schema/transformer/date.transformer';

@Entity({ name: 'rural_timeline_cnis_contribution_period_under_minimum' })
export class RuralTimelineAnalysisCnisContributionPeriodUnderMinimumTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'contribution_date',
    type: 'date',
    transformer: DateTransformer,
  })
  public contributionDate: Date;

  @Column({
    name: 'contribution_amount',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  public contributionAmount: string;

  @ManyToOne(
    () => RuralTimelineAnalysisCnisContributionPeriodTypeormEntity,
    (entity) => entity.ruralTimelineCnisContributionPeriodUnderMinimum,
  )
  @JoinColumn({ name: 'rural_timeline_cnis_contribution_period_id' })
  public ruralTimelineCnisContributionPeriod?:
    | RuralTimelineAnalysisCnisContributionPeriodTypeormEntity
    | undefined;

  protected override readonly _type =
    RuralTimelineAnalysisCnisContributionPeriodUnderMinimumTypeormEntity.name;
}
