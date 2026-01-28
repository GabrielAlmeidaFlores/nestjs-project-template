import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { RuralTimelineCnisContributionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/rural-timeline-cnis-contribution-period.typeorm.entity';

@Entity({ name: 'rural_timeline_cnis_contribution_period_under_minimum' })
export class RuralTimelineCnisContributionPeriodUnderMinimumTypeormEntity extends BaseTypeormEntity {
  @Column({
    name: 'contribution_date',
    type: 'date',
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
    () => RuralTimelineCnisContributionPeriodTypeormEntity,
    (entity) => entity.ruralTimelineCnisContributionPeriodUnderMinimum,
  )
  @JoinColumn({ name: 'rural_timeline_cnis_contribution_period_id' })
  public ruralTimelineCnisContributionPeriod:
    | RuralTimelineCnisContributionPeriodTypeormEntity
    | undefined;

  protected override readonly _type =
    RuralTimelineCnisContributionPeriodUnderMinimumTypeormEntity.name;
}
